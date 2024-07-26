'use client';

import { EventsPost } from '@/types/EventsPost';
import React from 'react';
import CleanerInput from '../cleaner/CleanerInput';
import ClientInput from '../client/ClientInput';
import { formatValue, removeStr } from '@/utils/formatValues';

type FormEventsProps = {
  post: EventsPost;
  setPost: React.Dispatch<React.SetStateAction<EventsPost>>;
};

function FormEvents({ post, setPost }: FormEventsProps) {
  return (
    <form className="flex flex-col gap-2" action="">
      <div className="input-content-row">
        <div className="input-content">
          <ClientInput required post={post} setPost={setPost} />
        </div>
        <div className="input-content">
          <CleanerInput required post={post} setPost={setPost} />
        </div>
      </div>
      <div className="input-content-row">
        <div className="input-content">
          <label className="required" htmlFor="">
            Start Time
          </label>
          <input
            required
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
          <label className="required" htmlFor="">
            Finish Time
          </label>
          <input
            required
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
          placeholder="No clean the bedroom"
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
          <label className="required" htmlFor="">
            Value
          </label>
          <input
            required
            value={formatValue(post.value)}
            onChange={(e) => {
              const value = removeStr(e.target.value);
              setPost((prevPost) => ({
                ...prevPost,
                value,
              }));
            }}
            type="text"
            step="0.01"
            className="input"
          />
        </div>
        <div className="input-content">
          <label className="required" htmlFor="">
            Pay method
          </label>
          <select
            required
            defaultValue="0"
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
            <option hidden disabled value="0">
              Select the pay method
            </option>
            <option value="perHour">Per Hour</option>
            <option value="total">Total Value</option>
          </select>
        </div>
      </div>
      <div className="input-content">
        <label className="required" htmlFor="">
          Who pay
        </label>
        <select
          required
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
          <option hidden disabled value="0">
            Select who will pay
          </option>
          <option value="clientPay">Client Pay</option>
          <option value="adminPay">Enterprise Pay</option>
        </select>
      </div>
    </form>
  );
}

export default FormEvents;
