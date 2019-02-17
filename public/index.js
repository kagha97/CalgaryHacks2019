// function getParkings(){
//     fetch('test-data.json')
//     .then((res) => res.json())
//     .then((data) => {
//       let output = '<h2>Parkings</h2>';
//       console.log(data);
//     });
//   }

//   getParkings();
console.log("alksdhjf;lnadf;lknbkflb;jlknbmkl");

const socket = io();

socket.on('server-data', function (data) {
  console.log(data);
});