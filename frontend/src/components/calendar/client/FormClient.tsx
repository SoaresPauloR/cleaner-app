import { ClientPopulate } from '@/types/ClientPopulate';
import { Address } from '@/types/PrismaTypes';
import React from 'react';

type FormCleanerProp = {
  post: ClientPopulate;
  setPost: React.Dispatch<React.SetStateAction<ClientPopulate>>;
};

function FormClient({ post, setPost }: FormCleanerProp) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newPost: ClientPopulate = { ...post };

    newPost[id as keyof ClientPopulate] = value as never;

    setPost(newPost);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newPost: ClientPopulate = { ...post };

    newPost.address[id as keyof Address] = value as never;

    setPost(newPost);
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="input-content-row">
        <div className="input-content">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Will Taylor..."
            type="text"
            className="input"
            value={post.name}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="input-content">
          <label htmlFor="number">Phone number</label>
          <input
            placeholder="9876 543210"
            type="text"
            className="input"
            value={post.number}
            id="number"
            onChange={handleChange}
          />
        </div>
      </div>

      <hr />

      <div className="input-content-row">
        <div className="input-content">
          <label htmlFor="postcode">Postcode</label>
          <input
            placeholder="SE1 7PB"
            type="text"
            className="input"
            value={post.address.postcode}
            id="postcode"
            onChange={handleChangeAddress}
          />
        </div>
        <div className="input-content">
          <label htmlFor="house_number">House Number</label>
          <input
            type="text"
            className="input"
            value={post.address.house_number}
            id="house_number"
            onChange={handleChangeAddress}
          />
        </div>
        <div className="input-content">
          <label htmlFor="street">Street</label>
          <input
            placeholder="Belvedere Road"
            type="text"
            className="input"
            value={post.address.street}
            id="street"
            onChange={handleChangeAddress}
          />
        </div>
      </div>
    </form>
  );
}

export default FormClient;
