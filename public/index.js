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

  get priceStr() {
    return "$" + this.prices.hr + "/hr, $" + this.prices.day + "/day, $" + this.prices.month + "/month";
  }

  get hoursStr() {
    return "weekdays  : " + this.hours.weekdays + "\n weekends : " + this.hours.weekends;
  }
}

var parkings = [];

socket.on('data', data => {
  parkings = [];
  data.forEach(aParkingInfo => {
    parkings.push(new Parking(aParkingInfo));
  });
  updateListOfParkings();
  let selectedTitle = document.getElementsByClassName("list-group-item list-group-item-action active");
  selectedTitle.length > 0 ? updateUI(selectedTitle[0].innerHTML) : "";
});


updateListOfParkings = () => {

  var totalListOfItems = document.getElementById('parkingList').children.length;
  if (totalListOfItems !== parkings.length) {
      parkings.forEach(aParking => {
        var item = document.createElement("a");
        item.classList.add("list-group-item");
        item.classList.add("list-group-item-action");
        item.innerHTML = aParking.title;
        item.addEventListener("click", showParkingInfo);
        document.getElementById('parkingList').appendChild(item);
      });
  }
}


//onclick handler function for list of parking
function showParkingInfo() {
  var selected = document.getElementsByClassName("list-group-item list-group-item-action active");
  if (selected.length > 0) {
    selected[0].className = selected[0].className.replace("active", " ");
  }
  this.className += "list-group-item list-group-item-action active";
  updateUI(this.innerHTML);
}


function updateUI(parkingTitle) {
    let filteredParking = parkings.find((aParking) => aParking.title == parkingTitle);

    document.getElementById("title").innerHTML = filteredParking.title;
    document.getElementById("address").innerHTML = filteredParking.address;
    document.getElementById("available-space").innerHTML = filteredParking.availableSpot;
    document.getElementById("total-space").innerHTML = filteredParking.totalSpot;
    document.getElementById('prices').innerHTML = filteredParking.priceStr;
    //document.getElementById('hours').innerHTML = filteredParking.hoursStr;
}
