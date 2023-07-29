import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { text: { type: String, required: true } },
  file: {
    type: Buffer
  },
  users: Array,
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    default: "sent",
    enum: ["sent", "delivered", "read"],
  }
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;