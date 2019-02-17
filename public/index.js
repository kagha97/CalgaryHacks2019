const socket = io();

socket.on('sensor-data', data => {
  console.log(data);
});