import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Define dirname for ES modules
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Serve static files from the dist directory
app.use(express.static(path.join(dirname, 'dist')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});