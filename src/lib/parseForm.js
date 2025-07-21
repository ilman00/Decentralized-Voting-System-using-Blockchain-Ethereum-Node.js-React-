// lib/parseForm.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), '/public/uploads/voters'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    // Create the upload directory if it doesn't exist
    fs.mkdirSync(form.uploadDir, { recursive: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
