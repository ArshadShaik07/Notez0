import { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Notes from "./components/notes.jsx";
import NotesProvider from "./Context/notesContext.jsx";
function App() {
  const [title, setTitle] = useState("");
  return (
    <NotesProvider>
      <Navbar onSearch={setTitle} />
      <div className="flex flex-row flex-wrap  overflow-auto">
        <Notes title={title} />
      </div>
    </NotesProvider>
  );
}

export default App;
