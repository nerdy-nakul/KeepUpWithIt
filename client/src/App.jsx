import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PriorityTasks from "./pages/PriorityTask";
import StickyNotes from "./pages/StickyNote";
import "./index.css";
import Calender from "./pages/Calender";
import Navbar from "./components/Navbar";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedData);
      });
  }, []);

  const handleAddTask = (title, start, end, priority) => {
    const newTask = { title, start, end, priority };
    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((task) => {
        const formattedTask = {
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        };
        setEvents([...events, formattedTask]);
      });
  };

  return (
    <div className="mx-auto p-4">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Calender events={events} handleAddTask={handleAddTask} />}
        />
        <Route path="/priority" element={<PriorityTasks events={events} />} />
        <Route path="/sticky-notes" element={<StickyNotes />} />
      </Routes>
    </div>
  );
}

export default App;
