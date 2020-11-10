const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));