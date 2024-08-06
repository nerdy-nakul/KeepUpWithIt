import React, { useState } from "react";

function PriorityTasks({ events }) {
  const [isSorted, setIsSorted] = useState(false);

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  const sortedEvents = isSorted
    ? [...events].sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
    : events;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks by Priority</h2>
      <button
        onClick={toggleSort}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        {isSorted ? "Show Original Order" : "Sort by Priority"}
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <div
            key={event._id}
            className="border border-gray-300 rounded p-4 shadow-lg"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p
              className={`mt-2 ${
                event.priority === "High"
                  ? "text-red-500"
                  : event.priority === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {event.priority} Priority
            </p>
            <p className="mt-2">
              <strong>Start:</strong> {new Date(event.start).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(event.end).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriorityTasks;
