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
        className={`fixed inset-0 flex flex-col justify-center items-center bg-transparent transition-all duration-50 ease-in backdrop-blur-sm border-2 shadow-lg p-6 z-50 ${
          createNote ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setCreateNote(false)}
            className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          >
            <MdClose />
          </button>
        </div>

        <input
          placeholder="Enter title"
          className="border-2 rounded-md w-1/2 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newPost.title}
          onChange={(e) =>
            setNewPost((prevPost) => ({ ...prevPost, title: e.target.value }))
          }
        />

        <textarea
          placeholder="Enter text"
          className="border-2 rounded-md w-1/2 p-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newPost.text}
          onChange={(e) =>
            setNewPost((prevPost) => ({ ...prevPost, text: e.target.value }))
          }
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
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
    );
  }
  //updating a post
  if (Object.keys(updatingPost).length > 0) {
    return (
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center bg-transparent transition-all duration-50 ease-in backdrop-blur-sm border-2 shadow-lg p-6 z-50 ${
          Object.keys(updatingPost).length > 0
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              setUpdatingPost({});
              setDisplayNote({});
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          >
            <MdClose />
          </button>
        </div>

        <input
          placeholder="Enter title"
          className="border-2 rounded-md w-1/2 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="border-2 rounded-md w-1/2 p-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={updatingPost.text}
          onChange={(e) =>
            setUpdatingPost((prevPost) => ({
              ...prevPost,
              text: e.target.value,
            }))
          }
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={async () => {
            setDisplayNote({});
            console.log(postTitle);
            await updateNote(postTitle, updatingPost);
            setUpdatingPost({});
            setNotes(await getNotes());
            setNote(null);
            alert("note updated succesfully");
          }}
        >
          Update Note
        </button>
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
      <div className="p-4 flex flex-col w-full items-center gap-3 ">
        <div
          className=" border rounded-lg p-3 w-full shadow-sm bg-white  relative hover:shadow-md transition"
          onClick={() => {
            setDisplayNote(note);
          }}
        >
          <p className="text-lg font-medium mb-1">{note.title}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{note.text}</p>
          <div className="absolute right-1 top-1 flex flex-row gap-1">
            <button
              className="px-3 py-1 bg-blue-400 font-semibold text-gray-100 text-center text-xs rounded-sm shadow-md hover:bg-green-600 hover:shadow-lg transition"
              onClick={(e) => {
                e.stopPropagation();
                setUpdatingPost({ title: note.title, text: note.text });
                setPostTitle(note.title);
              }}
            >
              update
            </button>
            <button
              className="px-3 py-1  bg-blue-400 font-semibold text-gray-100 text-center text-xs rounded-sm shadow-md hover:bg-green-600 hover:shadow-lg transition"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteNote(searchTitle);
                alert(`${searchTitle} deleted succesfully`);
                setDisplayNote({});
                setNotes(await getNotes());
                setNote(null);
              }}
            >
              delete
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
        <div className="p-4 flex flex-col w-full items-center gap-3">
          {notes.map((note, id) => {
            return (
              <div
                key={id}
                className="relative border rounded-lg p-3 w-full shadow-sm bg-white hover:shadow-md transition"
                onClick={() => setDisplayNote(note)}
              >
                <p className="text-lg font-medium mb-1">{note.title}</p>
                <p className="text-gray-600 text-sm line-clamp-1">
                  {note.text}
                </p>

                <div className="absolute right-1 top-1 flex flex-row gap-1">
                  <button
                    className="px-3 py-1 bg-blue-400 font-semibold text-gray-100 text-center text-xs rounded-md shadow-md hover:bg-green-600 hover:shadow-lg transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdatingPost({ title: note.title, text: note.text });
                      setPostTitle(note.title);
                      setDisplayNote({});
                    }}
                  >
                    update
                  </button>
                  <button
                    className="px-3 py-1  bg-blue-400 font-semibold text-gray-100 text-center text-xs rounded-md shadow-md hover:bg-green-600 hover:shadow-lg transition"
                    onClick={async (e) => {
                      e.stopPropagation();
                      setDisplayNote({});
                      alert(`${note.title} deleted succesfully`);
                      await deleteNote(note.title);
                      setNotes(await getNotes());
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full  flex-row justify-center items-center ">
          <p className="text-center">No notes available</p>
        </div>
      )}
    </>
  );
}

export default Notes;
