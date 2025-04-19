import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  fs.readFile(`${req.file?.path}`, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res
        .status(201)
        .json({ status: "success", filename: `/${req.file?.filename}` });
    }
  });
});

app.get("/:filename", (req, res) => {
  const file = path.join(__dirname + "/../uploads", req.params.filename);
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text" });
      res.write("Le fichier n'a pas été trouvé");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/octet-stream" });
      res.write(data);
      res.end();
    }
  });
});
app.listen(3002, () => {
  console.log(`Lancé sur ${process.env.UPLOAD_HOST}`);
});
