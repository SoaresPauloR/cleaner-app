import { EventCalendar } from '@/types/EventCalendar';
import { EventPopulate } from '@/types/EventPopulate';
import { DateSelectArg } from '@fullcalendar/core';
import React, { useEffect, useState } from 'react';
import SubmitButton from '../../buttons/SubmitButton';
import CancelButton from '../../buttons/CancelButton';
import FormEvents from './FormEvents';
import { EventsPost } from '@/types/EventsPost';
import Modal from '../../modal/Modal';
import Swal from 'sweetalert2';
import { isValueType, isPayMethod } from '@/types/PrismaTypes';

type CreateEventProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectInfo: DateSelectArg;
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

  const validatePost = (post: EventsPost): string | null => {
    if (
      !post.id_client ||
      !post.id_cleaner ||
      !post.date_start ||
      !post.date_finish ||
      !post.value ||
      !post.value_type ||
      !post.pay_method
    ) {
      return 'Missing required fields';
    }

    if (typeof post.id_client !== 'number') return 'Invalid Client';
    if (typeof post.id_cleaner !== 'number') return 'Invalid Cleaner';
    if (post.value <= 0) return 'Invalid Value';
    if (!isValueType(post.value_type)) return 'Invalid Value Type';
    if (!isPayMethod(post.pay_method)) return 'Invalid Pay Method';

    return null;
  };

  const saveEvent = async (): Promise<void> => {
    const newPost = { ...post };

    const validationError = validatePost(newPost);

    if (!selectInfo) return;

    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Error creating Event',
        text: validationError,
        confirmButtonText: 'Okay',
      });
      return;
    }

    newPost.date_start = convertDate(post.date_start);
    newPost.date_finish = convertDate(post.date_finish);

    try {
      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newPost),
        },
      );

      if (rawResponse.ok) {
        changeModal();
        Swal.fire({
          title: 'Event saved successfully',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      }

      const responseData = (await rawResponse.json()) as EventPopulate;

      if (responseData?.error) {
        Swal.fire({
          title: responseData.error,
          icon: 'error',
          confirmButtonText: 'Okay',
        });

        return;
      }

      setEvents([
        ...events,
        {
          id: responseData.id.toString(),
          title: responseData.client.name,
          start: responseData.date_start.toString(),
          end: responseData.date_finish.toString(),
        },
      ]);
    } catch (error) {
      console.error('Error saving event: ', error);

      Swal.fire({
        title: 'Error saving event',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
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
