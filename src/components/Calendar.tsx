'use client';

import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@/style/calendar.css';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import CreateEvent from './modal/CreateEvent';
import { Client, Events, Users } from '@prisma/client';
import Loading from './Loading';

type EventCompost = Events & {
  client: Client;
  cleaner: Users;
};

type EventCalendar = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export function Calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventCalendar[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo);
    setModalIsOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/events');
        const data = (await res.json()) as EventCompost[];
        const events = treatData(data);
        setEvents(events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={events}
        />
      )}
      <CreateEvent
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectInfo={selectInfo}
        setSelectInfo={setSelectInfo}
      />
    </>
  );
}

function treatData(data: EventCompost[]): EventCalendar[] {
  return data.map((e) => ({
    id: e.id.toString(),
    title: e.client.name,
    start: new Date(e.date).toISOString(),
    end: new Date(e.how_long).toISOString(),
  }));
}