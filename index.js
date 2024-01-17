const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(fileUpload());

app.use(cors());

app.post('/extract', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      res.status(400).json({ error: 'Missing file data' });
      return;
    }

    const pdfFile = req.files.file.data;

    const pdfData = await pdfParse(pdfFile);

    res.status(200).json({ text: pdfData.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
