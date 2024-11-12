import Message from "../models/message.js";

export const saveChatMessage = async (msg) => {
  try {
    await Message.create({
      sender: msg.sender,
      message: msg.message,
      imageUrl: msg.imageUrl || null,
    });
  } catch (error) {
    console.error("Error saving chat message:", error);
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
