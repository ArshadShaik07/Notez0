import {
  getNotes,
  getByTitle,
  deleteNote,
  postNote,
  updateNote,
} from "../data/data.jsx";
import { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { NotesContext } from "../Context/notesContext.jsx";

function Notes() {
  const { searchTitle, createNote, setCreateNote } = useContext(NotesContext);
  const [postTitle, setPostTitle] = useState(""); //this is the title required for updating the post which is taken as a parameter in the fetch req
  const [newPost, setNewPost] = useState({ title: "", text: "" });
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingPost, setUpdatingPost] = useState({});
  const [displayNote, setDisplayNote] = useState({});

  useEffect(() => {
    setLoading(true);
    getNotes()
      .then((res) => setNotes(res))
      .catch((e) => console.error(e.message));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getByTitle(searchTitle)
      .then((res) => {
        setNote(res);
        console.log("note", res);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e.message);
        alert(e.message);
        setNote(null);
        setLoading(false);
      });
  }, [searchTitle]);

  //creating a note
  if (createNote) {
    return (
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center bg-black/40 transition-all duration-150 ease-in backdrop-blur-md z-50 ${
          createNote ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative border-2 border-blue-300">
          <button
            onClick={() => setCreateNote(false)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold transition"
            title="Close"
          >
            <MdClose />
          </button>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wide drop-shadow">
            Create Note
          </h2>
          <input
            placeholder="Enter title"
            className="border-2 border-blue-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow"
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prevPost) => ({ ...prevPost, title: e.target.value }))
            }
          />
          <textarea
            placeholder="Enter text"
            className="border-2 border-blue-300 rounded-lg w-full p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm shadow"
            value={newPost.text}
            onChange={(e) =>
              setNewPost((prevPost) => ({ ...prevPost, text: e.target.value }))
            }
          />
          <button
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold text-base transition"
            onClick={async () => {
              await postNote(newPost);
              setNewPost({ title: "", text: "" });
              setCreateNote(false);
              setNotes(await getNotes());
            }}
          >
            Add Note
          </button>
        </div>
      </div>
    );
  }
  //updating a post
  if (Object.keys(updatingPost).length > 0) {
    return (
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center bg-black/40 transition-all duration-150 ease-in backdrop-blur-md z-50 ${
          Object.keys(updatingPost).length > 0
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
      >
        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative border-2 border-blue-300">
          <button
            onClick={() => {
              setUpdatingPost({});
              setDisplayNote({});
            }}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold transition"
            title="Close"
          >
            <MdClose />
          </button>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wide drop-shadow">
            Update Note
          </h2>
          <input
            placeholder="Enter title"
            className="border-2 border-blue-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow"
            value={updatingPost.title}
            onChange={(e) =>
              setUpdatingPost((prevPost) => ({
                ...prevPost,
                title: e.target.value,
              }))
            }
          />
          <textarea
            placeholder="Enter text"
            className="border-2 border-blue-300 rounded-lg w-full p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm shadow"
            value={updatingPost.text}
            onChange={(e) =>
              setUpdatingPost((prevPost) => ({
                ...prevPost,
                text: e.target.value,
              }))
            }
          />
          <button
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold text-base transition"
            onClick={async () => {
              setDisplayNote({});
              await updateNote(postTitle, updatingPost);
              setUpdatingPost({});
              setNotes(await getNotes());
              setNote(null);
              alert(`${postTitle} updated successfully`);
            }}
          >
            Update Note
          </button>
        </div>
      </div>
    );
  }
  //displaying a note in detail
  if (Object.keys(displayNote).length > 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        {/* White Box */}
        <div className="bg-white w-96 max-w-lg rounded-2xl shadow-xl p-6 transition-all duration-200 ease-in-out scale-100 opacity-100">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setDisplayNote({})}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Note Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            {displayNote.title}
          </h2>

          {/* Note Text */}
          <p className="text-gray-600">{displayNote.text}</p>
        </div>
      </div>
    );
  }

  //searching a note
  if (note && searchTitle) {
    return (
      <div className="p-6 flex justify-center items-center w-full">
        <div
          className="relative bg-gradient-to-br from-blue-200 via-white to-blue-100 border border-blue-200 rounded-xl shadow-lg h-40 w-72 flex flex-col justify-between p-4 hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setDisplayNote(note);
          }}
        >
          <div>
            <p className="text-lg font-semibold text-blue-700 mb-2 truncate">
              {note.title}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2">{note.text}</p>
          </div>
          <div className="absolute right-2 bottom-2 flex flex-row gap-2">
            <button
              className="px-2 py-1 bg-blue-400 font-semibold text-white text-xs rounded shadow hover:bg-green-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                setUpdatingPost({ title: note.title, text: note.text });
                setPostTitle(note.title);
              }}
            >
              Update
            </button>
            <button
              className="px-2 py-1 bg-red-400 font-semibold text-white text-xs rounded shadow hover:bg-red-600 transition"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteNote(searchTitle);
                alert(`${searchTitle} deleted successfully`);
                setDisplayNote({});
                setNotes(await getNotes());
                setNote(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  //loading case
  if (loading) {
    return (
      <div className="w-full text-2xl font-bold text-center">
        Loading please wait.
      </div>
    );
  }

  return (
    <>
      {notes.length > 0 && !loading ? (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {(note && searchTitle ? [note] : notes).map((note, id) => {
            return (
              <div
                key={id}
                className="relative bg-gradient-to-br from-blue-200 via-white to-blue-100 border border-blue-200 rounded-xl shadow-lg h-40 flex flex-col justify-between p-4 hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setDisplayNote(note)}
              >
                <div>
                  <p className="text-lg font-semibold text-blue-700 mb-2 truncate">
                    {note.title}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {note.text}
                  </p>
                </div>
                <div className="absolute right-2 bottom-2 flex flex-row gap-2">
                  <button
                    className="px-2 py-1 bg-blue-400 font-semibold text-white text-xs rounded shadow hover:bg-green-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdatingPost({ title: note.title, text: note.text });
                      setPostTitle(note.title);
                      setDisplayNote({});
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="px-2 py-1 bg-red-400 font-semibold text-white text-xs rounded shadow hover:bg-red-600 transition"
                    onClick={async (e) => {
                      e.stopPropagation();
                      setDisplayNote({});
                      alert(`${note.title} deleted successfully`);
                      await deleteNote(note.title);
                      setNotes(await getNotes());
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full flex-row justify-center items-center ">
          <p className="text-center">No notes available</p>
        </div>
      )}
    </>
  );
}

export default Notes;
