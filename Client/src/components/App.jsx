import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000')
socket.on('connect', () => {
  console.log(`connected on ${socket.id}`)
})

export default function App() {
  const [content, setContent] = useState([]);
  const [myMessage, setMyMessage] = useState(null);

  socket.on('recieve-messages', messages => {
    setContent(messages)
  })

  useEffect(() => {
    if (myMessage) {
      socket.emit('send-message', myMessage)
    }
  }, [myMessage])

  const handleSub = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('.input');
    const inputVal = input.value;
    setMyMessage(inputVal)
    input.value = '';
  }

  var count = 0;
  return (
    <div id="App">
      <div className = 'messages'>
        {content.map((message) => {
          return <p key = {++count}>{message}</p>
        })}
      </div>
      <form onSubmit = {handleSub}>
        <input className = 'input'></input>
        <button className = 'send'>Send</button>
      </form>
    </div>
  );
}
