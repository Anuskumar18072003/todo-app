import mongoose from "mongoose";

/* creating todo schema which includes title,description,status of the todo for CRUD operations
along with owner which  creates reference to user model */
const todoSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ["pending","completed"], default: "pending" },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);
