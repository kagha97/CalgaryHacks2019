// function getParkings(){
//     fetch('test-data.json')
//     .then((res) => res.json())
//     .then((data) => {
//       let output = '<h2>Parkings</h2>';
//       console.log(data);
//     });
//   }

//   getParkings();

const socket = io();

io.connect('http://localhost:8080');

socket.on('status', function(data) {
  console.log(data.temp);
});