'use client';

import { PostProps } from '@/types/PostProps';
import { Client } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import PlusButton from './buttons/PlusButton';
import CreateClient from './CreateCleaner';

function ClientInput({ post, setPost }: PostProps) {
  const [clients, setClients] = useState<Array<Client>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch('api/clients');
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
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <label htmlFor="">Client</label>
      <div className="flex gap-2">
        <select
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
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </>
  );
}

export default ClientInput;
