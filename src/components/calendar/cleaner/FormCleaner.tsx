import { Users } from '@prisma/client';
import React from 'react';

type FormCleanerProp = {
  post: Users;
  setPost: React.Dispatch<React.SetStateAction<Users>>;
};

function FormCleaner({ post, setPost }: FormCleanerProp) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const newPost: Users = { ...post };

    newPost[id as keyof Users] = value as never;

    setPost(newPost);
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="input-content">
        <label htmlFor="name">Name</label>
        <input
          placeholder="Amanda..."
          type="text"
          className="input"
          value={post.name}
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="input-content">
        <label htmlFor="email">Email</label>
        <input
          placeholder="email@email.com"
          type="email"
          className="input"
          value={post.email}
          id="email"
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
    </form>
  );
}

export default FormCleaner;
