import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const getRandomColor = (() => {
  const colors = ["#FF8b94"];

  let currentIndex = 0;

  return () => {
    const color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    return color;
  };
})();

function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    fetch("https://keep-up-with-it-6cyx.vercel.app/api/sticky-notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleAddNote = () => {
    const newNote = { content, color, x: 0, y: 0 };
    fetch("https://keep-up-with-it-6cyx.vercel.app/api/sticky-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((note) => setNotes([...notes, note]));
  };

  const handleStop = (e, data, noteId) => {
    fetch(`https://keep-up-with-it-6cyx.vercel.app/api/sticky-notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x: data.x, y: data.y }),
    });
  };

  const handleDeleteNote = (noteId) => {
    fetch(`https://keep-up-with-it-6cyx.vercel.app/api/sticky-notes/${noteId}`, {
      method: "DELETE",
    }).then(() => {
      setNotes(notes.filter((note) => note._id !== noteId));
    });
  };

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Sticky Notes</h2>
      <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md w-full">
        <input
          type="text"
          placeholder="Note content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex ">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 cursor-pointer h-[50px] w-full"
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition w-full h-[50px] ml-4"
          >
            Add Note
          </button>
        </div>
      </div>
      <div className="relative flex flex-wrap justify-center gap-4 w-full max-w-5xl">
        {notes.map((note) => {
          const borderColor = note.color || getRandomColor();
          const backgroundColor = hexToRgba(borderColor, 0.2);

          return (
            <Draggable
              key={note._id}
              defaultPosition={{ x: note.x, y: note.y }}
              onStop={(e, data) => handleStop(e, data, note._id)}
            >
              <div
                style={{
                  border: `5px solid ${borderColor}`,
                  backgroundColor,
                }}
                className="relative p-4 border border-gray-300 rounded-lg shadow-lg cursor-move max-w-xs w-60 h-60 flex flex-col"
              >
                <div className="flex-1 overflow-auto">
                  <p className="text-sm text-gray-800 h-full p-2 whitespace-pre-wrap break-words">
                    {note.content}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="mt-4 bg-gray-800 text-white p-2 rounded hover:bg-black transition"
                >
                  Delete
                </button>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}

export default StickyNotes;
