import { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Notes from "./components/notes.jsx";
import NotesProvider from "./Context/notesContext.jsx";
function App() {
  const [title, setTitle] = useState("");
  return (
    <div className="h-[60vh] w-[80vw] flex flex-col  bg-blue-300 p-0 object-contain rounded-xl">
      <NotesProvider>
        <Navbar onSearch={setTitle} />
        <div className="flex flex-row flex-wrap  overflow-auto">
          <Notes title={title} />
        </div>
      </NotesProvider>
    </div>
  );
}

export default App;
