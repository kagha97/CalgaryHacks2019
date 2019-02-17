const socket = io();

socket.on('data', data => {
  console.log(data);
});