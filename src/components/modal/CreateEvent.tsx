import { EventCalendar } from '@/types/EventCalendar';
import { EventCompost } from '@/types/EventCompost';
import { DateSelectArg } from '@fullcalendar/core';
import { Client, Users } from '@prisma/client';
import React, { useEffect, useState } from 'react';

type CreateEventProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectInfo: DateSelectArg | null;
  setSelectInfo?: React.Dispatch<React.SetStateAction<DateSelectArg | null>>;
  setEvents: React.Dispatch<React.SetStateAction<EventCalendar[]>>;
  events: EventCalendar[];
};

const CreateEvent = ({
  modalIsOpen,
  setModalIsOpen,
  selectInfo,
  setEvents,
  events,
}: CreateEventProps): JSX.Element => {
  if (!selectInfo) return <></>;

  const basePost = {
    id: 0,
    id_client: 0,
    id_cleaner: 0,
    more_cleaner: '',
    date_start: selectInfo.startStr + 'T08:00',
    date_finish: selectInfo.startStr + 'T08:00',
    more: '',
    value: 0,
    value_type: 'perHour',
    pay_method: 'clientPay',
  };

  const [clients, setClients] = useState<Array<Client>>([]);
  const [cleaners, setCleaners] = useState<Array<Users>>([]);
  const [post, setPost] = useState(basePost);

  const changeModal = () => setModalIsOpen(!modalIsOpen);

  const convertDate = (date: string): string => {
    const localDate = new Date(date).toISOString();
    return localDate;
  };

  const saveEvent = async () => {
    const newPost = post;

    if (!selectInfo) return;

    newPost.date_start = convertDate(post.date_start);
    newPost.date_finish = convertDate(post.date_finish);

    const rawResponse = await fetch('api/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const responseData = (await rawResponse.json()) as EventCompost;

    setEvents([
      ...events,
      {
        id: responseData.id.toString(),
        title: responseData.client.name,
        start: responseData.date_start.toString(),
        end: responseData.date_finish.toString(),
      },
    ]);

    if (rawResponse.ok) changeModal();
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

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalIsOpen(!modalIsOpen);
      }
    };

    if (modalIsOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen, setModalIsOpen]);

  if (!modalIsOpen) return <></>;

  return (
    <div className="z-20 absolute bg-black bg-opacity-40 w-full h-full left-0 top-0 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[600px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Create Events</h1>
          <div>{selectInfo?.startStr}</div>
        </div>
        <div>
          <form className="flex flex-col gap-2" action="">
            <div className="input-content-row">
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
