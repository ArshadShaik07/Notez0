import Notes from "../models/model.notes.js";

//get all posts
const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({});
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//get notes by title

const getNoteByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    console.log(title);
    const note = await Notes.findOne({ title: title });
    console.log(note);
    if (!note) {
      throw new Error("note not found");
    }
    res.status(200).json(note);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};

//post a note
const postNote = async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    console.log(note);
    res.status(201).json(note);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "error occured" });
  }
};

//update a note
const updateNote = async (req, res) => {
  try {
    const title = req.params.title;
    let note = await Notes.findOneAndUpdate({ title }, req.body, { new: true });
    if (!note) {
      throw new Error("error occured!");
    }
    console.log(note);
    res.status(200).json(note);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//delete a note

const deleteNote = async (req, res) => {
  try {
    const title = req.params.title;
    const note = await Notes.findOneAndDelete({ title }, req.body);
    if (!note) {
      throw new Error("error occured!");
    }
    res.status(200).json({ msg: "deleted succesfully!" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export { getNotes, getNoteByTitle, updateNote, postNote, deleteNote };
