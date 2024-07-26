'use client';

import { PostProps } from '@/types/PostProps';
import { Client } from '@/types/PrismaTypes';
import React, { useEffect, useState } from 'react';
import PlusButton from '../../buttons/PlusButton';
import CreateClient from '../client/CreateClient';

function ClientInput({ post, setPost, required }: PostProps) {
  const [clients, setClients] = useState<Array<Client>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const changeModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clients`,
      );
      if (response.ok) {
        const result = await response.json();
        setClients(result);
      }
    };

    getClients();
  }, []);

  const handlePlusButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    changeModal();
  };

  return (
    <>
      <label className="required" htmlFor="">
        Client
      </label>
      <div className="flex gap-2">
        <select
          required={required}
          value={post.id_client}
          onChange={(e) => {
            const id_client = parseInt(e.target.value, 10);
            setPost((prevPost) => ({
              ...prevPost,
              id_client,
            }));
          }}
          className="input"
        >
          <option hidden value="0">
            Select a client
          </option>
          {clients.map(
            (e) =>
              e && (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ),
          )}
        </select>
        <PlusButton action={handlePlusButtonClick} />
      </div>

      {modalIsOpen && (
        <CreateClient
          changeModal={changeModal}
          clients={clients}
          setClients={setClients}
        />
      )}
    </>
  );
}

export default ClientInput;
