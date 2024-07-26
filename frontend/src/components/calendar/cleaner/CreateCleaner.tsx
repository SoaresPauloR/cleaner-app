import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import CancelButton from '../../buttons/CancelButton';
import SubmitButton from '../../buttons/SubmitButton';
import { Users } from '@/types/PrismaTypes';
import FormCleaner from './FormCleaner';

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
    const rawResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      },
    );

    const responseData = (await rawResponse.json()) as Users;

    if (rawResponse.ok) {
      changeModal();
    }

    if (post) setCleaners([...cleaners, responseData]);
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
