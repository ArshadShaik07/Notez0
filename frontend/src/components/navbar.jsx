import { useState, useContext } from "react";
import { NotesContext } from "../Context/notesContext.jsx";

function Navbar() {
  const [title, setTitle] = useState("");
  const { setSearchTitle, setCreateNote } = useContext(NotesContext);
  return (
    <div className="flex flex-row justify-between bg-[#fdf6e3] rounded-t-xl sticky top-0 p-1.5">
      <div>
        <p
          className="relative text-3xl font-bold 
   before:content-['Notez'] before:absolute before:top-[2px] before:right-[3px] before:text-gray-400 before:opacity-0 hover:before:opacity-60 before:transition before:duration-200 before:-z-10 cursor-default"
          onClick={() => window.location.reload()}
        >
          Notez
        </p>
      </div>
      <div className=" w-10/12 flex flex-row justify-around items-center">
        <input
          className="border-2 border-gray-500 rounded-md w-2/3 h-9/12 py-0 px-1 text-sm"
          placeholder="SEarch for Note"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target.value !== "") {
                setTitle("");
                setSearchTitle(title);
              } else {
                alert("enter correct title");
              }
            }
          }}
        />
        <button
          className="px-3 py-1 bg-green-500 font-semibold text-gray-100 text-center text-sm rounded-md shadow-md hover:bg-green-600 hover:shadow-lg transition"
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
          className="px-3 py-1 bg-green-500 font-semibold text-gray-100 text-center text-sm rounded-md shadow-md hover:bg-green-600 hover:shadow-lg transition"
          onClick={() => setCreateNote(true)}
        >
          Create a note
        </button>
      </div>
    </div>
  );
}

export default Navbar;
