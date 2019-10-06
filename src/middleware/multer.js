import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();

const limits = { files: 1, fileSize: 512000 };

const multerUploads = (req, res, next) => multer({ storage, limits }).single('image')(req, res, function (err) {
  if (err) return res.status(400).json({ success: false, message: 'upload is limited to one file with a maximum size of 512kb' });
  else next();
});

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };