// controllers.js
const express = require("express");
// const { User, Textbook } = require('../model/model');
const { User, Textbook, Comment } = require('../model/model');
const router = express.Router();
const multer = require("multer");
const { Readable } = require("stream");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.use("/", (req, res,next) => {
    console.log(req.path,req.method);
    next();
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password
  };

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await User.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

// module.exports = router;

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { filename, category } = req.body;
    const fileBuffer = req.file.buffer;

    const textbook = new Textbook({
      filename,
      category,
      file: fileBuffer,
    });

    await textbook.save();

    res.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/textbooks", async (req, res) => {
  try {
    const textbooks = await Textbook.find({}, { filename: 1, category: 1, file: 1 });
    res.json(textbooks);
  } catch (error) {
    console.error('Error fetching textbooks:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/textbooks/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const textbooks = await Textbook.find({ category }, { filename: 1, category: 1, file: 1 });
    res.json(textbooks);
  } catch (error) {
    console.error('Error fetching textbooks:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/textbooks/download/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const textbook = await Textbook.findById(id);

    if (!textbook) {
      return res.status(404).json({ message: 'Textbook not found' });
    }

    const fileBuffer = Buffer.isBuffer(textbook.file) ? textbook.file : Buffer.from(textbook.file);

    res.setHeader('Content-Disposition', `attachment; filename="${textbook.filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error fetching textbook:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// router.post('/textbooks/comment', async (req, res) => {
//   const { textbookId, text } = req.body;

//   try {
//     const comment = new Comment({ textbookId, text });
//     await comment.save();
//     res.json({ message: 'Comment added successfully!' });
//   } catch (error) {
//     console.error('Error adding comment:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/textbooks/comments/:textbookId', async (req, res) => {
//   const { textbookId } = req.params;

//   try {
//     const comments = await Comment.find({ textbookId });
//     res.json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/textbooks/comment', async (req, res) => {
  const { textbookId, text, username } = req.body; // Include username in the request body

  try {
    const comment = new Comment({ textbookId, text, username });
    await comment.save();
    res.json({ message: 'Comment added successfully!' });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/textbooks/comments/:textbookId', async (req, res) => {
  const { textbookId } = req.params;

  try {
    const comments = await Comment.find({ textbookId });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
