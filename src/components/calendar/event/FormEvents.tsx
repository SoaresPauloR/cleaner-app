'use client';

import { EventsPost } from '@/types/EventsPost';
import React from 'react';
import CleanerInput from '../cleaner/CleanerInput';
import ClientInput from '../client/ClientInput';

type FormEventsProps = {
  post: EventsPost;
  setPost: React.Dispatch<React.SetStateAction<EventsPost>>;
};

function FormEvents({ post, setPost }: FormEventsProps) {
  return (
    <form className="flex flex-col gap-2" action="">
      <div className="input-content-row">
        <div className="input-content">
          <ClientInput post={post} setPost={setPost} />
        </div>
        <div className="input-content">
          <CleanerInput post={post} setPost={setPost} />
        </div>
      </div>
      {/* <div className="input-content">
        <label htmlFor="">More Cleaner</label>
        <select
          value={post.more_cleaner}
          onChange={(e) => {
            const more_cleaner = e.target.value;
            setPost((prevPost) => ({
              ...prevPost,
              more_cleaner,
            }));
          }}
          className="input"
        >
          <option hidden value="0">
            Select more cleaners
          </option>
          {cleaners.map((e) => e && <option key={e.id}>{e.name}</option>)}
        </select>
      </div> */}
      <div className="input-content-row">
        <div className="input-content">
          <label htmlFor="">Start Time</label>
          <input
            value={post.date_start}
            type="datetime-local"
            onChange={(e) => {
              const date_start = e.target.value;
              setPost((prevPost) => ({
                ...prevPost,
                date_start,
              }));
            }}
            className="input"
          />
        </div>
        <div className="input-content">
          <label htmlFor="">Finish Time</label>
          <input
            value={post.date_finish}
            onChange={(e) => {
              const date_finish = e.target.value;
              setPost((prevPost) => ({
                ...prevPost,
                date_finish,
              }));
            }}
            type="datetime-local"
            className="input"
          />
        </div>
      </div>
      <div className="input-content">
        <label htmlFor="">More Information</label>
        <input
          type="text"
          value={post.more}
          onChange={(e) => {
            const more = e.target.value;
            setPost((prevPost) => ({
              ...prevPost,
              more,
            }));
          }}
          step="0.01"
          className="input"
        />
      </div>
      <div className="input-content-row">
        <div className="input-content">
          <label htmlFor="">Value</label>
          <input
            value={post.value}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setPost((prevPost) => ({
                ...prevPost,
                value,
              }));
            }}
            type="number"
            step="0.01"
            className="input"
          />
        </div>
        <div className="input-content">
          <label htmlFor="">Value Type</label>
          <select
            value={post.value_type}
            onChange={(e) => {
              const value_type = e.target.value;
              setPost((prevPost) => ({
                ...prevPost,
                value_type,
              }));
            }}
            className="input"
          >
            <option value="perHour">Per Hour</option>
            <option value="total">Total Value</option>
          </select>
        </div>
      </div>
      <div className="input-content">
        <label htmlFor="">Pay Method</label>
        <select
          value={post.pay_method}
          onChange={(e) => {
            const pay_method = e.target.value;
            setPost((prevPost) => ({
              ...prevPost,
              pay_method,
            }));
          }}
          className="input"
        >
          <option value="clientPay">Client Pay</option>
          <option value="adminPay">Enterprise Pay</option>
        </select>
      </div>
    </form>
  );
}

export default FormEvents;
