import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import CancelButton from '../../buttons/CancelButton';
import SubmitButton from '../../buttons/SubmitButton';
import FormClient from './FormClient';
import { ClientPopulate } from '@/types/ClientPopulate';
import { Client } from '@/types/PrismaTypes';
import Swal from 'sweetalert2';

type Props = {
  changeModal: () => void;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

function CreateClient({ changeModal, clients, setClients }: Props) {
  const [post, setPost] = useState<ClientPopulate>({
    id: 0,
    name: '',
    number: '',
    status: 'enable',
    address: {
      id: 0,
      id_client: 0,
      house_number: 0,
      postcode: '',
      street: '',
      status: 'enable',
    },
  });

  const validatePost = (post: ClientPopulate): string | null => {
    const { address } = post;

    if (
      !post.name ||
      !post.number ||
      !address ||
      !address.house_number ||
      !address.postcode ||
      !address.street
    ) {
      return 'Missing required fields';
    }

    if (typeof post.name !== 'string') return 'Invalid Name';
    if (typeof post.number !== 'string') return 'Invalid Phone Number';
    if (typeof address.postcode !== 'string') return 'Invalid Postcode';
    if (address.house_number <= 0) return 'Invalid House Number';
    if (typeof address.street !== 'string') return 'Invalid Street';

    return null;
  };

  const handleSubmitButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const validationError = validatePost(post);

    if (validationError) {
      Swal.fire({
        title: 'Error creating client',
        text: validationError,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }

    post.address.house_number = parseInt(post.address.house_number.toString());

    const rawResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/clients`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(post),
      },
    );

    if (!rawResponse.ok) {
      Swal.fire({
        title: 'Error creating client',
        icon: 'error',
        confirmButtonText: 'Okay',
      });

      return;
    }

    const responseData = (await rawResponse.json()) as ClientPopulate;

    if (post) setClients([...clients, responseData]);

    changeModal();
  };

  const handleCancelButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    changeModal();
  };

  const header = <h1 className="text-xl font-bold">Create Client</h1>;

  const footer = (
    <>
      <CancelButton action={handleCancelButton} title="close" />
      <SubmitButton action={handleSubmitButton} title="Save" />
    </>
  );

  return (
    <Modal header={header} footer={footer}>
      <FormClient post={post} setPost={setPost} />
    </Modal>
  );
}

export default CreateClient;
