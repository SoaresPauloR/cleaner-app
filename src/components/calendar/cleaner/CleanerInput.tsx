import { PostProps } from '@/types/PostProps';
import { Users } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import PlusButton from '../../buttons/PlusButton';
import CreateCleaner from './CreateCleaner';

function CleanerInput({ post, setPost }: PostProps) {
  const [cleaners, setCleaners] = useState<Array<Users>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const changeModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    const getCleaners = async () => {
      const response = await fetch('api/cleaner');
      if (response.ok) {
        const result = await response.json();
        setCleaners(result);
      }
    };

    getCleaners();
  }, []);

  const handlePlusButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    changeModal();
  };

  return (
    <>
      <label htmlFor="">Cleaner</label>
      <div className="flex gap-2">
        <select
          value={post.id_cleaner}
          onChange={(e) => {
            const id_cleaner = parseInt(e.target.value, 10);
            setPost((prevPost) => ({
              ...prevPost,
              id_cleaner,
            }));
          }}
          className="input"
        >
          <option hidden value="0">
            Select a cleaner
          </option>
          {cleaners.map(
            (e) =>
              e && (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              ),
          )}
        </select>
        <PlusButton action={handlePlusButtonClick} />
      </div>

      {modalIsOpen && (
        <CreateCleaner
          changeModal={changeModal}
          cleaners={cleaners}
          setCleaners={setCleaners}
        />
      )}
    </>
  );
}

export default CleanerInput;
