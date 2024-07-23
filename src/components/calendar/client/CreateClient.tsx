import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import CancelButton from '../../buttons/CancelButton';
import SubmitButton from '../../buttons/SubmitButton';
import FormClient from './FormClient';
import { ClientPopulate } from '@/types/ClientPopulate';
import { Client } from '@prisma/client';

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

  const handleCancelButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    changeModal();
  };

  const handleSubmitButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const newPost = { ...post, address: { ...post.address } };

    newPost.address.house_number = parseInt(
      newPost.address.house_number.toString(),
    );

    const rawResponse = await fetch('api/clients', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const responseData = (await rawResponse.json()) as ClientPopulate;

    if (rawResponse.ok) {
      changeModal();
    }

    if (post) setClients([...clients, responseData]);
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
