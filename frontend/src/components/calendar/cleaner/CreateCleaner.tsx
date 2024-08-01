import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import CancelButton from '../../buttons/CancelButton';
import SubmitButton from '../../buttons/SubmitButton';
import { Users } from '@/types/PrismaTypes';
import FormCleaner from './FormCleaner';
import Swal from 'sweetalert2';
import { isEmail } from 'validator';

type Props = {
  changeModal: () => void;
  cleaners: Users[];
  setCleaners: React.Dispatch<React.SetStateAction<Users[]>>;
};

function CreateCleaner({ changeModal, cleaners, setCleaners }: Props) {
  const [post, setPost] = useState<Users>({
    id: 0,
    email: '',
    name: '',
    number: '',
    type: 'Cleaner',
    id_google: '',
    status: 'enable',
  });

  const handleSubmitButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const validatePost = (post: Users): string | null => {
      if (!post.email || !post.name || !post.number) {
        return 'Missing required fields';
      }

      if (typeof post.name !== 'string') return 'Invalid Name';
      if (typeof post.number !== 'string') return 'Invalid Phone Number';
      if (!isEmail(post.email)) return 'Invalid Email';

      return null;
    };

    try {
      const validationError = validatePost(post);

      if (validationError) {
        Swal.fire({
          title: 'Error creating cleaner',
          text: validationError,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        return;
      }

      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cleaners`,
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
          title: 'Error saving cleaner',
          icon: 'error',
          confirmButtonText: 'Okay',
        });

        return;
      }

      const responseData = (await rawResponse.json()) as Users;

      setCleaners([...cleaners, responseData]);

      changeModal();
    } catch (error) {
      console.error('Error saving cleaner: ', error);

      Swal.fire({
        title: 'Error saving cleaner',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  const handleCancelButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    changeModal();
  };

  const header = <h1 className="text-xl font-bold">New Cleaner</h1>;

  const footer = (
    <>
      <CancelButton action={handleCancelButton} title="close" />
      <SubmitButton action={handleSubmitButton} title="Save" />
    </>
  );

  return (
    <Modal header={header} footer={footer}>
      <FormCleaner post={post} setPost={setPost} />
    </Modal>
  );
}

export default CreateCleaner;
