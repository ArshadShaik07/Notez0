import Notes from "../models/model.notes.js";

//get all posts
const getNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find({});
    console.log(notes);
    res.status(200).json(notes);
  } catch (e) {
    next(e);
  }
};

//get notes by title

const getNoteByTitle = async (req, res, next) => {
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
    next(e);
  }
};

//post a note
const postNote = async (req, res, next) => {
  try {
    const note = await Notes.create(req.body);
    console.log(note);
    res.status(201).json(note);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

//update a note
const updateNote = async (req, res, next) => {
  try {
    const title = req.params.title;
    let note = await Notes.findOneAndUpdate({ title }, req.body, { new: true });
    if (!note) {
      throw new Error("error occured!");
    }
    console.log(note);
    res.status(200).json(note);
  } catch (e) {
    next(e);
  }
};

//delete a note

const deleteNote = async (req, res, next) => {
  try {
    const title = req.params.title;
    const note = await Notes.findOneAndDelete({ title }, req.body);
    if (!note) {
      throw new Error("error occured!");
    }
    res.status(200).json({ msg: "deleted succesfully!" });
  } catch (e) {
    next(e);
  }
};

export { getNotes, getNoteByTitle, updateNote, postNote, deleteNote };
