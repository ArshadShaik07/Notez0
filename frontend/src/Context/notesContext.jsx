import { createContext, use, useState } from "react";

export const NotesContext = createContext();

function NotesProvider({ children }) {
  const [searchTitle, setSearchTitle] = useState("");
  const [createNote, setCreateNote] = useState(false);
  return (
    <NotesContext.Provider
      value={{ searchTitle, setSearchTitle, createNote, setCreateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
