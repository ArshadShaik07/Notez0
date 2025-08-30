import { useState, useContext } from "react";
import { NotesContext } from "../Context/notesContext.jsx";

function Navbar() {
  const [title, setTitle] = useState("");
  const { setSearchTitle, setCreateNote } = useContext(NotesContext);
  return (
    <div className="flex flex-col w-full">
      <nav className="flex flex-row items-center w-full bg-gray-900 text-white sticky top-0 z-50 px-6 py-3 shadow-lg">
        <div className="flex-1 flex items-center">
          <p
            className="relative text-3xl font-extrabold text-blue-400 tracking-wide cursor-pointer select-none transition hover:text-blue-300"
            onClick={() => window.location.reload()}
          >
            Notez
            <span className="absolute text-sm text-gray-400 opacity-0 hover:opacity-60 transition duration-200 -z-10 right-0 top-0">
              Notez
            </span>
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <input
            className="border border-gray-700 bg-gray-800 rounded-lg w-full max-w-md h-10 px-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search for Note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.target.value !== "") {
                  setTitle("");
                  setSearchTitle(title);
                } else {
                  alert("Enter correct title");
                }
              }
            }}
          />
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            className="px-4 py-2 bg-blue-600 font-semibold text-white text-sm rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => {
              if (title !== "") {
                setSearchTitle(title);
                setTitle("");
              } else {
                alert("Enter correct title");
              }
            }}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-green-600 font-semibold text-white text-sm rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => setCreateNote(true)}
          >
            Create a note
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
