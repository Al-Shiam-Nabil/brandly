import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Users as UsersIcon,
} from "lucide-react";
import React, { useMemo, useState } from "react";

import { EventType, type CRMEvent } from "../../types";
import EventModal from "./EventModal";

const MOCK_EVENTS: CRMEvent[] = [
  {
    id: "e1",
    title: "Acme Contract Review",
    description: "Finalize the terms for the Q3 enterprise agreement.",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "11:30",
    type: EventType.MEETING,
    location: "Conference Room B",
    attendees: ["Sarah Jenkins", "Mike Ross"],
  },
  {
    id: "e2",
    title: "Team Sync",
    description: "Weekly alignment on sales goals.",
    date: new Date().toISOString().split("T")[0],
    startTime: "14:00",
    endTime: "15:00",
    type: EventType.CALL,
    attendees: ["Sales Team"],
  },
];

const EventsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CRMEvent[]>(() => {
    const saved = localStorage.getItem("nexus_events");
    return saved ? JSON.parse(saved) : MOCK_EVENTS;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CRMEvent | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // Calendar Logic
  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    // Padding for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const handleSaveEvent = (eventData: any) => {
    if (selectedEvent) {
      const updated = events.map((e) =>
        e.id === selectedEvent.id ? { ...eventData, id: e.id } : e,
      );
      setEvents(updated);
      localStorage.setItem("nexus_events", JSON.stringify(updated));
    } else {
      const newEvent = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
      };
      const updated = [...events, newEvent];
      setEvents(updated);
      localStorage.setItem("nexus_events", JSON.stringify(updated));
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Delete this event?")) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      localStorage.setItem("nexus_events", JSON.stringify(updated));
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-fadeIn">
      {/* Main Calendar Section */}
      <div className="flex-1  overflow-y-auto">
        <div className="flex items-center justify-between flex-wrap mb-8 gap-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              {monthName} {currentDate.getFullYear()}
            </h1>
            <p className="text-slate-500">
              Plan and manage your upcoming schedule.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2.5 hover:bg-slate-50 border-r border-slate-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-2.5 hover:bg-slate-50 border-l border-slate-200 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedEvent(null);
                setSelectedDateStr(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-indigo-100 cursor-pointer"
            >
              <Plus size={20} />
              New Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200  bg-slate-50/50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-4 text-center text-sm font-bold text-slate-700 uppercase"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[120px] ">
            {calendarDays.map((date, idx) => {
              const dateStr = date ? date.toISOString().split("T")[0] : null;
              const dayEvents = dateStr
                ? events.filter((e) => e.date === dateStr)
                : [];
              const isToday = dateStr === todayStr;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (dateStr) {
                      setSelectedDateStr(dateStr);
                      setSelectedEvent(null);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`flex flex-col items-center justify-center border-r border-b border-slate-100 p-2 group hover:bg-slate-50/80 transition-all cursor-pointer relative ${!date ? "bg-slate-50/30" : ""}`}
                >
                  {date && (
                    <>
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm font-semibold inline-flex items-center  justify-center w-7 h-7 rounded-full ${isToday ? "bg-indigo-600 text-white" : "text-slate-700"}`}
                        >
                          {date.getDate()}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setIsModalOpen(true);
                            }}
                            className={`text-[10px] px-1.5 py-0.5 rounded border truncate font-medium ${
                              event.type === EventType.MEETING
                                ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                                : event.type === EventType.CALL
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : event.type === EventType.WORKSHOP
                                    ? "bg-amber-50 text-amber-700 border-amber-100"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {event.startTime} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-[10px] text-slate-400 font-medium pl-1">
                            + {dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-80 bg-white rounded-xl border border-slate-200 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Upcoming Events
        </h2>
        <div className="space-y-6">
          {events
            .filter((e) => e.date >= todayStr)
            .sort((a, b) =>
              (a.date + a.startTime).localeCompare(b.date + b.startTime),
            )
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="group relative pl-4 border-l-2 border-indigo-500 space-y-2"
              >
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3
                  className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                >
                  {event.title}
                </h3>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={14} />
                    {event.startTime} - {event.endTime}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  )}
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <UsersIcon size={14} />
                      {event.attendees.length} Attendee
                      {event.attendees.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              </div>
            ))}
          {events.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-500 font-medium">No upcoming events</p>
            </div>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        editingEvent={selectedEvent}
        initialDate={selectedDateStr}
      />
    </div>
  );
};

export default EventsPage;
