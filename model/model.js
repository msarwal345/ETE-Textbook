// models/model.js
const mongoose = require("mongoose");

const uri = "mongodb+srv://mani:gearfive@cluster0.kxdqrri.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log('Database Connected'))
  .catch(() => console.log('Error'));

  
const textbookSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  category: { type: String, required: true },
  file: { type: Buffer, required: true },
});

const Textbook = mongoose.model("Textbook", textbookSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const commentSchema = new mongoose.Schema({
  textbookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Textbook', required: true },
  text: { type: String, required: true },
  username: { type: String, required: true }, // Add username to the Comment schema
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Textbook, User, Comment };
