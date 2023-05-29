require('dotenv').config();
const path = require('path');
const io = require('socket.io')(3000, {
  cors: {
    origin: ["http://localhost:8080",
    "http://localhost:3000"
  ],
  }
  });

const messages = [];

io.on('connection', socket => {
  socket.on('send-message', message => {
    messages.push(message)
    io.emit('recieve-messages', messages)
  })
})


const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client/dist')));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
