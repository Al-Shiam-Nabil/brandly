import {
  Calendar,
  CalendarOff,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
} from "lucide-react";

export default function Events() {
  const events = [
    {
      id: "1",
      title: "Partner Strategy Sync",
      time: "02:00 PM",
      date: "Oct 26",
      location: "Zoom Conference",
      type: "Meeting",
      attendeeCount: 12,
    },
    {
      id: "2",
      title: "Performance Workshop",
      time: "10:00 AM",
      date: "Oct 28",
      location: "Main Office, L2",
      type: "Workshop",
      attendeeCount: 5,
    },
  ];
  return (
    <div className="bg-white rounded-xl w-full border border-slate-100  shadow-sm overflow-hidden h-auto flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-700">Upcoming Events</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                {/* Minimal Date Indicator */}
                <div className="flex flex-col items-center justify-center min-w-[56px] h-14 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-colors">
                  <span className="text-[12px] font-bold text-slate-500 uppercase  leading-none">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-xl font-black text-slate-800 leading-tight">
                    {event.date.split(" ")[1]}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className=" font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {event.location}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <CalendarOff className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No events found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] leading-relaxed">
              Your calendar is currently clear. Schedule a meeting to get
              started.
            </p>
            <button className="mt-6 text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
              Demo: Populate Events
            </button>
          </div>
        )}
      </div>

      {/* Footer / Summary */}
      {events.length > 0 && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500 uppercase">
            {events.length} Event{events.length > 1 ? "s" : ""} scheduled
          </span>
          <button className="text-sm font-bold text-indigo-600 hover:underline">
            View Full Calendar
          </button>
        </div>
      )}
    </div>
  );
}
