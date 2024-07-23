import { EventCalendar } from '@/types/EventCalendar';
import { EventPopulate } from '@/types/EventPopulate';
import { DateSelectArg } from '@fullcalendar/core';
import React, { useEffect, useState } from 'react';
import SubmitButton from '../../buttons/SubmitButton';
import CancelButton from '../../buttons/CancelButton';
import FormEvents from './FormEvents';
import { EventsPost } from '@/types/EventsPost';
import Modal from '../../modal/Modal';

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
    value_type: '0',
    pay_method: '0',
  } as EventsPost;

  const [post, setPost] = useState(basePost);

  const changeModal = () => setModalIsOpen(!modalIsOpen);

  const convertDate = (date: string): string => {
    const localDate = new Date(date).toISOString();
    return localDate;
  };

  const saveEvent = async (): Promise<void> => {
    const newPost = { ...post };

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

    const responseData = (await rawResponse.json()) as EventPopulate;

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

  const header = (
    <>
      <h1 className="text-xl font-bold">Create Events</h1>
      <div>{selectInfo?.startStr}</div>
    </>
  );

  const footer = (
    <>
      <CancelButton action={changeModal} title="close" />
      <SubmitButton action={saveEvent} title="Save" />
    </>
  );

  return (
    <Modal header={header} footer={footer}>
      <FormEvents post={post} setPost={setPost} />
    </Modal>
  );
};

export default CreateEvent;
