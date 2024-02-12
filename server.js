const express = require("express");
const cors = require("cors");
const multer = require("multer");
const collection = require('./model/model');
const controllers = require('./controller/controller');
const app = express();

const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use("/", controllers);

app.post('/upload', upload.single('file'), controllers);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(8000, () => {
  console.log("port connected");
});
