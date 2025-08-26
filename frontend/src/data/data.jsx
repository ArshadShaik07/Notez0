async function getNotes() {
  const res = await fetch("http://localhost:8000/api/notes");
  console.log(res);
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  const notes = await res.json();
  console.log(notes);
  return notes;
}

async function getByTitle(title) {
  const res = await fetch(`http://localhost:8000/api/notes/${title}`);
  if (!res.ok) throw new Error("note not found");
  return await res.json();
}

async function deleteNote(title) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`http://localhost:8000/api/notes/${title}`, options);
  res = await res.json();
  return res;
}

async function postNote(newNote) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  };
  const notes = await fetch(`http://localhost:8000/api/notes`, options);
  let res = await notes.json();
  console.log(res);
  return res;
}

async function updateNote(title, updatedNote) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  };
  const note = await fetch(`http://localhost:8000/api/notes/${title}`, options);
  let res = await note.json();
  return res;
}

export { getNotes, getByTitle, deleteNote, postNote, updateNote };
