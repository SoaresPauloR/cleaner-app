'use client';
import Layout from '@/components/Layout';
import React from 'react';
import { Calendar } from '@/components/Calendar';

function CalendarPage() {
  return (
    <Layout activePage="calendar">
      <div className="min-height flex gap-4">
        <div className="bg-white ms-4 rounded-3xl w-80 min-height"></div>
        <Calendar />
      </div>
    </Layout>
  );
}

export default CalendarPage;
