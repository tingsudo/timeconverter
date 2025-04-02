'use client';

import React, { useState } from 'react';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

const TIME_ZONES = [
  { name: 'China', zone: 'Asia/Shanghai' },
  { name: 'Adelaide', zone: 'Australia/Adelaide' },
  { name: 'Melbourne', zone: 'Australia/Melbourne' },
  { name: 'New York', zone: 'America/New_York' },
  { name: 'Chicago', zone: 'America/Chicago' }
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return {
    value: hour.toString().padStart(2, '0'),
    label: `${displayHour} ${period}`
  };
});

export default function TimeConverter() {
  const [selectedZone, setSelectedZone] = useState(TIME_ZONES[0].zone);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [californiaTime, setCaliforniaTime] = useState('');

  const handleConvert = () => {
    if (!selectedDate || !selectedHour) return;

    const dateTime = `${selectedDate}T${selectedHour}:00:00`;
    const utcTime = zonedTimeToUtc(dateTime, selectedZone);
    const laTime = utcToZonedTime(utcTime, 'America/Los_Angeles');
    setCaliforniaTime(format(laTime, 'EEEE, MMM d, yyyy h:mm a'));
  };

  return (
    <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Select Time Zone</label>
          <select
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            {TIME_ZONES.map((tz) => (
              <option key={tz.zone} value={tz.zone}>
                {tz.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Hour</label>
            <select
              className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="">Select hour</option>
              {HOURS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold hover:from-blue-600 hover:to-purple-600 mt-2"
          onClick={handleConvert}
        >
          Convert to California Time
        </button>

        {californiaTime && (
          <div className="mt-3 bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">California time is</p>
            <p className="text-xl font-bold text-gray-800">{californiaTime}</p>
          </div>
        )}
      </div>
    </div>
  );
} 