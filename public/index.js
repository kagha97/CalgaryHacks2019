const socket = io();

//class to make parking object
class Parking {
  constructor(info) {
    this.title = info.title;
    this.address = info.address;
    this.availableSpot = info.availableSpot;
    this.totalSpot = info.totalSpot;
    this.prices = info.prices;
    this.hours = info.hours;
  }

  static arrayToString(array) {
    let strPrice = "";
    array.forEach(price => {
      strPrice += price + " ";
    });
    return strPrice;
  }
}

var parkings = [];

socket.on('data', data => {
  parkings = [];
  data.forEach(aParkingInfo => {
    parkings.push(new Parking(aParkingInfo));
  });
  updateListOfParkings();
  console.log(data);
});


updateListOfParkings = () => {

  var totalListOfItems = document.getElementById('parkingList').children.length;
  if (totalListOfItems !== parkings.length) {
      parkings.forEach(aParking => {
        var item = document.createElement("a");
        item.href = "#";
        item.classList.add("list-group-item");
        item.classList.add("list-group-item-action");
        item.innerHTML = aParking.title;
        item.addEventListener("click", updateDOM);
        document.getElementById('parkingList').appendChild(item);
      });
  }
}


//onclick handler function for list of parking
function updateDOM() {
  var selected = document.getElementsByClassName("list-group-item list-group-item-action active");
  if (selected.length > 0) {
    selected[0].className = selected[0].className.replace("active", " ");
  }
  
  this.className += "list-group-item list-group-item-action active";
  let filteredParking = parkings.find((aParking) => aParking.title == this.innerHTML);

  document.getElementById("title").innerHTML = filteredParking.title;
  document.getElementById("address").innerHTML = filteredParking.address;
  document.getElementById("available-space").innerHTML = filteredParking.availableSpot;
  document.getElementById("total-space").innerHTML = filteredParking.totalSpot;
  document.getElementById('prices').innerHTML = Parking.arrayToString(filteredParking.prices);
  document.getElementById('hours').innerHTML = Parking.arrayToString(filteredParking.hours);
}

// //get list of parkings
// var parkingListContainer = document.getElementById("parkingList");
// var parkingLists = parkingListContainer.getElementsByClassName("list-group-item list-group-item-action");


// //asssign onclick to each item in the list of parking
// for (var i = 0; i < parkingLists.length; i++) {
//   parkingLists[i].addEventListener("click", updateDOM);
// }