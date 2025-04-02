import React from 'react';
import WeeklySchedule from '@/components/WeeklySchedule';
import TimeConverter from '@/components/TimeConverter';

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Time Zone Converter</h1>
      
      <div className="space-y-4">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">This Week's Schedule</h2>
          <WeeklySchedule />
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Find California Time</h2>
          <TimeConverter />
        </section>
      </div>
    </main>
  );
} 