const { fileURLToPath } = require('url');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Define dirname for ES modules
const currentFileUrl = new URL(require.main.filename);
const filename = fileURLToPath(currentFileUrl);
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