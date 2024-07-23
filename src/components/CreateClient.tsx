import React from 'react';
import Modal from './modal/Modal';
import CancelButton from './buttons/CancelButton';
import SubmitButton from './buttons/SubmitButton';

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateCleaner({ modalIsOpen, setModalIsOpen }: Props) {
  const header = (
    <>
      <h1 className="text-xl font-bold">Create Client</h1>
    </>
  );

  const handleCancelButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  const handleSubmitButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  const footer = (
    <>
      <CancelButton action={handleCancelButton} title="close" />
      <SubmitButton action={handleSubmitButton} title="Save" />
    </>
  );

  return (
    <Modal header={header} footer={footer}>
      <>Form</>
    </Modal>
  );
}

export default CreateCleaner;
