import mongoose from "mongoose";

// Define schema
const conversationSchema = new mongoose.Schema({
  jsonLevel: {
    type: String,
    required: true
  },
  jsonLanguage: {
    type: String,
    required: true

  },
  jsonRole: {
    type: String,
    required: true

  },
  convId: {
    type: String,

  },
  jsonconversation: {
    type: mongoose.Schema.Types.Mixed
  },
  conversationMessages: [  // Store the conversation as an array of messages
    {
      sender: { type: String, enum: ["user", "ai"], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);


