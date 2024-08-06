import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoCloseCircleOutline, IoAddCircleOutline } from "react-icons/io5";

const localizer = momentLocalizer(moment);

const Calender = ({ events, handleAddTask }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [priority, setPriority] = useState("Low");
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  return (
    <div className="relative bg-gray-100">
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-black">Add Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="start"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label
                  htmlFor="end"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  End Date
                </label>
                <input
                  type="datetime-local"
                  id="end"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button
              onClick={() => {
                handleAddTask(title, start, end, priority);
                toggleOverlay();
              }}
              className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-200"
            >
              Add Task
            </button>
            <button
              onClick={toggleOverlay}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
            >
              <IoCloseCircleOutline className="w-8 h-8 text-red-600" />
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-white rounded-lg shadow-lg p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          className="bg-white"
        />
      </div>

      <button
        onClick={toggleOverlay}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 z-50"
      >
        <IoAddCircleOutline className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Calender;
