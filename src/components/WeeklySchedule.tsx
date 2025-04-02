'use client';

import React, { useState, useEffect } from 'react';
import { format, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

// Set the reference time with explicit time zone
const REFERENCE_TIME = '2025-04-04T18:00:00'; // 6 PM PT with UTC-7 offset
const TIME_ZONES = [
  { name: 'China', zone: 'Asia/Shanghai' },
  { name: 'Adelaide', zone: 'Australia/Adelaide' },
  { name: 'Melbourne', zone: 'Australia/Melbourne' },
  { name: 'New York', zone: 'America/New_York' },
  { name: 'Chicago', zone: 'America/Chicago' },
  { name: 'Los Angeles', zone: 'America/Los_Angeles' }
];

export default function WeeklySchedule() {
  const [localTime, setLocalTime] = useState<string>('');
  const [timeZones, setTimeZones] = useState<{ name: string; time: string }[]>([]);
  const [californiaTime, setCaliforniaTime] = useState<string>('');

  useEffect(() => {
    // Convert reference time to UTC
    const utcTime = zonedTimeToUtc(REFERENCE_TIME, 'America/Los_Angeles');

    // Get California time
    const caTime = utcToZonedTime(utcTime, 'America/Los_Angeles');
    setCaliforniaTime(format(caTime, 'EEEE, MMM d, yyyy h:mm a'));

    // Get local time
    const localZonedTime = utcToZonedTime(utcTime, Intl.DateTimeFormat().resolvedOptions().timeZone);
    setLocalTime(format(localZonedTime, 'EEEE, MMM d, yyyy h:mm a'));

    // Calculate times for all zones
    const times = TIME_ZONES.map(tz => {
      const zonedTime = utcToZonedTime(utcTime, tz.zone);
      return {
        name: tz.name,
        time: format(zonedTime, 'EEEE, MMM d, yyyy h:mm a')
      };
    });
    setTimeZones(times);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg">
      <div className="space-y-3 border-b border-gray-200 pb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-1">California time</p>
          <p className="text-2xl font-bold tracking-tight">{californiaTime}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 font-medium">Your local time</p>
          <p className="text-lg text-gray-700 font-semibold">{localTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {timeZones.map((tz, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p className="font-semibold text-gray-700">{tz.name}</p>
            </div>
            <p className="text-gray-600 text-sm">{tz.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 