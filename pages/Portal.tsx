
import React, { useState, useMemo } from 'react';
import { Badge, CalendarEvent } from '../types';
import { CALENDAR_EVENTS } from '../constants';

const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9, 1)); // October 2023 for demo
  const [selectedDay, setSelectedDay] = useState<number | null>(27);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const eventsOnSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    const dateString = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    return CALENDAR_EVENTS.filter(e => e.date === dateString);
  }, [selectedDay, currentMonth]);

  const hasEvent = (day: number) => {
    const dateString = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return CALENDAR_EVENTS.some(e => e.date === dateString);
  };

  const getDayEvents = (day: number) => {
    const dateString = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return CALENDAR_EVENTS.filter(e => e.date === dateString);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Academic Calendar</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="text-sm font-bold text-slate-700">{monthName} {year}</span>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Calendar Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-slate-300 uppercase py-2">{d}</div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 md:h-14"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              const hasEvents = hasEvent(day);
              const events = getDayEvents(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-10 md:h-14 rounded-xl flex flex-col items-center justify-center relative transition-all group overflow-hidden ${
                    isSelected ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-600 group-hover:text-emerald-600'}`}>
                    {day}
                  </span>
                  {hasEvents && (
                    <div className="flex gap-0.5 mt-1">
                      {events.slice(0, 3).map((e, idx) => (
                        <div 
                          key={idx} 
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white' : 
                            e.type === 'Exam' ? 'bg-rose-400' :
                            e.type === 'Assignment' ? 'bg-blue-400' :
                            e.type === 'Holiday' ? 'bg-amber-400' : 'bg-emerald-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">
              {selectedDay ? `${monthName} ${selectedDay}` : 'Select a date'}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {eventsOnSelectedDay.length > 0 ? (
              eventsOnSelectedDay.map(event => (
                <div key={event.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2 h-2 rounded-full ${
                      event.type === 'Exam' ? 'bg-rose-500' :
                      event.type === 'Assignment' ? 'bg-blue-500' :
                      event.type === 'Holiday' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      {event.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 leading-tight group-hover:text-emerald-600 transition-colors">{event.title}</h4>
                  {event.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-400 font-medium">No major events scheduled</p>
              </div>
            )}
            
            {/* Quick list of next major things if today is empty */}
            {eventsOnSelectedDay.length === 0 && (
              <div className="mt-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Next 7 Days</p>
                {CALENDAR_EVENTS.filter(e => {
                  const dayNum = parseInt(e.date.split('-')[2]);
                  return dayNum > (selectedDay || 0) && dayNum <= (selectedDay || 0) + 7;
                }).slice(0, 2).map(e => (
                  <div key={e.id} className="flex items-center gap-4 p-2 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-xs font-black text-emerald-600">{e.date.split('-')[2]}</div>
                    <div className="text-xs font-bold text-slate-600 truncate">{e.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Portal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Demo Data with Icons and Trends
  const grades = [
    { 
      subject: 'Advanced Physics', 
      score: 'A', 
      percent: 94, 
      trend: '+2.4%',
      color: 'bg-blue-500',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.127l-2.96-.592a2 2 0 00-2.117 1.43l-.477 2.387a2 2 0 001.43 2.117l2.96.592a2 2 0 001.186-.127l.628-.283a6 6 0 013.86-.517l2.387.477a2 2 0 001.022-.547l.477-2.387z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 10l5 5m0-5l-5 5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5V3m0 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      )
    },
    { 
      subject: 'World History', 
      score: 'A-', 
      percent: 91, 
      trend: '+0.8%',
      color: 'bg-emerald-500',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      subject: 'Philosophy', 
      score: 'B+', 
      percent: 88, 
      trend: '-1.2%',
      color: 'bg-amber-500',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      subject: 'Artificial Intelligence 101', 
      score: 'A+', 
      percent: 98, 
      trend: '+4.5%',
      color: 'bg-purple-500',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      )
    },
  ];

  const schedule = [
    { time: '08:30 AM', subject: 'Molecular Biology', room: 'Lab 4B', type: 'Lecture' },
    { time: '10:15 AM', subject: 'Advanced Physics', room: 'Room 201', type: 'Lab' },
    { time: '01:00 PM', subject: 'World History', room: 'Auditorium', type: 'Seminar' },
    { time: '02:45 PM', subject: 'Classical Piano', room: 'Music Hall', type: 'Practice' },
  ];

  const announcements = [
    { 
      id: 'a1',
      title: 'Winter Concert Rehearsals', 
      desc: 'All orchestra members must attend the full rehearsal in the Main Hall this Friday.',
      date: 'Oct 26, 2023', 
      priority: 'High' 
    },
    { 
      id: 'a2',
      title: 'New Library Hours', 
      desc: 'Starting next week, the central library will remain open until 9:00 PM on weekdays.',
      date: 'Oct 24, 2023', 
      priority: 'Low' 
    },
    { 
      id: 'a3',
      title: 'Science Fair Project Drafts Due', 
      desc: 'Please submit your initial project abstracts to Dr. Chen via the portal by midnight.',
      date: 'Oct 22, 2023', 
      priority: 'High' 
    },
    { 
      id: 'a4',
      title: 'Community Service Fair', 
      desc: 'Discover local volunteer opportunities. Meet in the quad during lunch break.',
      date: 'Oct 20, 2023', 
      priority: 'Medium' 
    },
  ];

  const badges: Badge[] = [
    {
      id: 'scholar',
      title: 'Honor Roll',
      description: 'Maintain an average above 90% across all subjects.',
      color: 'bg-amber-400',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
      criteria: (data) => (data.reduce((acc: number, curr: any) => acc + curr.percent, 0) / data.length) >= 90
    },
    {
      id: 'stem-star',
      title: 'STEM Champion',
      description: 'Score 95% or higher in a Science or Tech subject.',
      color: 'bg-blue-400',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.4503-.385l-7 4.2a1 1 0 00-.26 1.477l7 10a1 1 0 001.45.247l7-4.2a1 1 0 00.26-1.477l-7-10zM11 6.414l3.293 3.293-1.414 1.414L11 9.243 9.121 11.121 7.707 9.707 11 6.414z" clipRule="evenodd" /></svg>,
      criteria: (data) => data.some((g: any) => g.percent >= 95 && (g.subject.includes('Physics') || g.subject.includes('AI')))
    },
    {
      id: 'humanist',
      title: 'Civic Leader',
      description: 'Excellent performance in Humanities & Social Sciences.',
      color: 'bg-emerald-400',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" /></svg>,
      criteria: (data) => data.some((g: any) => g.percent >= 90 && (g.subject.includes('History') || g.subject.includes('Philosophy')))
    },
    {
      id: 'early-bird',
      title: 'Punctuality Pro',
      description: 'Attend all scheduled morning classes for one month.',
      color: 'bg-indigo-400',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>,
      criteria: () => true // Demo award
    }
  ];

  const earnedBadges = useMemo(() => {
    return badges.map(b => ({
      ...b,
      unlocked: b.criteria(grades)
    }));
  }, [grades]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[700px] flex items-center justify-center bg-slate-50 py-20 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-center border border-slate-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Student & Parent Portal</h1>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Access your personalized learning dashboard, grades, and school schedule.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] active:scale-95"
              >
                Sign In to Dashboard
              </button>
              <div className="flex items-center space-x-2 py-2">
                <div className="flex-grow h-px bg-slate-200"></div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Help & Support</span>
                <div className="flex-grow h-px bg-slate-200"></div>
              </div>
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Forgot Credentials?
              </button>
            </div>
            <p className="mt-10 text-xs text-slate-400">
              Authorized personnel only. Lumina Academy IT Support: (555) 012-3456
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-5">
            {/* Profile Photo Placeholder */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="https://i.pravatar.cc/150?img=12" 
                alt="Alex Sterling" 
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-1">Welcome back, Alex</h1>
              <p className="text-slate-500">Student ID: #LUM-2023-892 • Senior Year</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm transition-colors self-start"
          >
            Log Out
          </button>
        </div>

        {/* Calendar Section - Full Width High Priority */}
        <section className="mb-12">
          <CalendarView />
        </section>

        {/* Dynamic Achievements Section */}
        <section className="mb-12 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Your Achievements</h2>
                <p className="text-slate-500 text-sm">Earn badges by excelling in your courses and community.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                {earnedBadges.filter(b => b.unlocked).length}/{badges.length} Unlocked
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {earnedBadges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] ${
                    badge.unlocked 
                    ? 'bg-white border-emerald-100 shadow-lg shadow-emerald-50' 
                    : 'bg-slate-50 border-slate-100 opacity-60 grayscale'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl ${badge.unlocked ? badge.color : 'bg-slate-300'}`}>
                    {badge.unlocked ? badge.icon : (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{badge.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Grades Overview Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Academic Progress</h2>
                <button className="text-emerald-600 text-sm font-bold hover:underline">Full Report Card &rarr;</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {grades.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg text-white ${item.color} shadow-sm`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{item.subject}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm ${item.color}`}>
                        {item.score}
                      </span>
                    </div>
                    
                    {/* Header for Progress Bar */}
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance</span>
                      <span className={`text-[10px] font-black ${item.percent >= 90 ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {item.percent}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner mb-2">
                      {/* Benchmark Marker at 90% */}
                      <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white/60 z-10"></div>
                      
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000 ease-out relative`} 
                        style={{ width: `${item.percent}%` }}
                      >
                        {/* Shimmer Effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {item.trend}
                        </span>
                        <svg className={`w-2 h-2 ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          {item.trend.startsWith('+') 
                            ? <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                            : <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 10-2 0v4H7a1 1 0 100 2h6a1 1 0 100-2h-4V7z" />
                          }
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">Target: 90.0%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Schedule Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Today's Schedule</h2>
                <div className="text-slate-400 text-sm font-medium">Monday, Oct 27</div>
              </div>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-2xl transition-colors border-l-4 border-emerald-500">
                    <div className="w-20 flex-shrink-0 text-sm font-bold text-slate-500">{item.time}</div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-800">{item.subject}</h4>
                      <p className="text-xs text-slate-400">{item.type} • {item.room}</p>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-emerald-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice Board Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Notice Board</h2>
                <button className="text-emerald-600 text-sm font-bold hover:underline">Archive &rarr;</button>
              </div>
              <div className="space-y-4">
                {announcements.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                          item.priority === 'High' ? 'bg-red-100 text-red-600' :
                          item.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {item.priority} Priority
                        </span>
                        <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                      </div>
                      <span className="text-xs font-medium text-slate-400">Posted: {item.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area - Right Column */}
          <div className="space-y-8">
            
            {/* Quick Actions Card */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><button className="flex items-center gap-3 hover:text-emerald-400 transition-colors"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Library Database</button></li>
                <li><button className="flex items-center gap-3 hover:text-emerald-400 transition-colors"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Tech Support Ticket</button></li>
                <li><button className="flex items-center gap-3 hover:text-emerald-400 transition-colors"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Absence Notification</button></li>
                <li><button className="flex items-center gap-3 hover:text-emerald-400 transition-colors"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Tuition & Payments</button></li>
              </ul>
            </div>

            {/* School Spirit Card */}
            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-100">
              <h3 className="text-lg font-bold mb-4">Lumina Spirit</h3>
              <p className="text-emerald-50 text-xs leading-relaxed mb-6">
                Don't forget to wear your house colors this Friday for the Inter-House Sports Meet!
              </p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-emerald-600" alt="Student" />
                ))}
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
