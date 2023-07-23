import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { text: { type: String, required: true } },
  users: Array,
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;