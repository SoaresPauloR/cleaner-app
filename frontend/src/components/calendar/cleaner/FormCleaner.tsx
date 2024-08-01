import { Users } from '@/types/PrismaTypes';
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
        <label htmlFor="name" className="required">
          Name
        </label>
        <input
          required
          placeholder="Amanda..."
          type="text"
          className="input"
          value={post.name}
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="input-content">
        <label htmlFor="email" className="required">
          Email
        </label>
        <input
          required
          placeholder="email@email.com"
          type="email"
          className="input"
          value={post.email}
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="input-content">
        <label htmlFor="number" className="required">
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
    </form>
  );
}

export default FormCleaner;
