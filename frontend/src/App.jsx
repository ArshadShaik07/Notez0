import { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Notes from "./components/notes.jsx";
import NotesProvider from "./Context/notesContext.jsx";

function App() {
  const [title, setTitle] = useState("");
  return (
    <NotesProvider>
      <div
        className="min-h-screen w-full"
        style={{
          background: "linear-gradient(to right, #7f9cf5, #a084e8)", // Lightened purple → blue
        }}
      >
        <Navbar onSearch={setTitle} />
        <div className="flex flex-row flex-wrap overflow-auto">
          <Notes title={title} />
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
