import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "enter title"],
    },
    text: {
      type: String,
      required: true,
      default: "no text added",
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Note", notesSchema);

export default Notes;
