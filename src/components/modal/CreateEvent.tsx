import { DateSelectArg } from '@fullcalendar/core/index.js';
import { Client, Users } from '@prisma/client';
import React, { useEffect, useState } from 'react';

type CreateEventProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectInfo: DateSelectArg | null;
  setSelectInfo?: React.Dispatch<React.SetStateAction<DateSelectArg | null>>;
};

const CreateEvent = ({
  modalIsOpen,
  setModalIsOpen,
  selectInfo,
}: CreateEventProps): JSX.Element => {
  if (!modalIsOpen) return <div></div>;

  const basePost = {
    id: 0,
    id_client: 0,
    id_cleaner: 0,
    more_cleaner: '',
    date: '2023-06-01T00:00:00.000Z',
    how_long: '2023-06-01T00:00:00.000Z',
    more: '',
    value: 0,
    value_type: 'perHouer',
    pay_method: 'clientPay',
  };

  const [clients, setClients] = useState<Array<Client>>([]);
  const [cleaners, setCleaners] = useState<Array<Users>>([]);
  const [post, setPost] = useState(basePost);

  const changeModal = () => setModalIsOpen(!modalIsOpen);

  const saveEvent = () => {
    console.log(post);
    changeModal();
  };

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch('api/clients');
      if (response.ok) {
        const result = await response.json();
        setClients(result);
      }
    };

    const getCleaners = async () => {
      const response = await fetch('api/cleaner');
      if (response.ok) {
        const result = await response.json();
        setCleaners(result);
      }
    };

    getClients();
    getCleaners();
  }, []);

  return (
    <div className="z-20 absolute bg-black bg-opacity-40 w-full h-full left-0 top-0 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-96 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Create Events</h1>
          <div>{selectInfo?.startStr}</div>
        </div>
        <div>
          <form className="flex flex-col gap-2" action="">
            <div className="input-content">
              <label htmlFor="">Client</label>
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
            </div>
            <div className="input-content">
              <label htmlFor="">Cleaner</label>
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
            </div>
            <div className="input-content">
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
            </div>
            <div className="input-content-row">
              <div className="input-content w-full">
                <label htmlFor="">Start Time</label>
                <input
                  value={post.date}
                  type="time"
                  onChange={(e) => {
                    const date = e.target.value;
                    setPost((prevPost) => ({
                      ...prevPost,
                      date,
                    }));
                  }}
                  className="input"
                />
              </div>
              <div className="input-content w-full">
                <label htmlFor="">Finish Time</label>
                <input
                  value={post.how_long}
                  onChange={(e) => {
                    const how_long = e.target.value;
                    setPost((prevPost) => ({
                      ...prevPost,
                      how_long,
                    }));
                  }}
                  type="time"
                  className="input"
                />
              </div>
            </div>
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
                <option value="perHouer">Per Hour</option>
                <option value="total">Total Value</option>
              </select>
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
        </div>
        <div className="flex gap-2">
          <button
            className="w-full rounded-lg text-red-700 border border-red-700 p-2 hover:bg-red-700 hover:text-white transition-3"
            onClick={changeModal}
          >
            Close
          </button>
          <button
            className="w-full rounded-lg bg-green-500 text-white font-bold p-2 hover:bg-green-600 transition-3"
            onClick={saveEvent}
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
