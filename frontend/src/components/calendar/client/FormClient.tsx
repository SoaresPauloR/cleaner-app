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
          <label className="required" htmlFor="name">
            Name
          </label>
          <input
            required
            placeholder="Will Taylor..."
            type="text"
            className="input"
            value={post.name}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="input-content">
          <label className="required" htmlFor="number">
            Phone number
          </label>
          <input
            required
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
          <label className="required" htmlFor="postcode">
            Postcode
          </label>
          <input
            required
            placeholder="SE1 7PB"
            type="text"
            className="input"
            value={post.address.postcode}
            id="postcode"
            onChange={handleChangeAddress}
          />
        </div>
        <div className="input-content">
          <label className="required" htmlFor="house_number">
            House Number
          </label>
          <input
            required
            type="text"
            className="input"
            value={parseInt(post.address.house_number.toString())}
            id="house_number"
            onChange={handleChangeAddress}
          />
        </div>
        <div className="input-content">
          <label className="required" htmlFor="street">
            Street
          </label>
          <input
            required
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
