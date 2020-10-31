const express = require('express');
const path = require('path');
const port = process.env.PORT || 3005;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'cover.html'));
});
app.listen(port);