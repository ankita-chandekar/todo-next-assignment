import mongoose, { models } from "mongoose";
import User from "./User";

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
