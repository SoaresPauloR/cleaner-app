'use client';
import FullCalendar from '@fullcalendar/react';
import React, { useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@/style/calendar.css';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';
import CreateEvent from './modal/CreateEvent';

export function Calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);

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

  return (
    <>
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
        // eventsSet={}
      />

      <CreateEvent
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectInfo={selectInfo}
        setSelectInfo={setSelectInfo}
      />
    </>
  );
}
