const socket = io();

socket.on('data', data => {
  console.log(data);
});


var parkingListContainer = document.getElementById("parkingList");
var parkingLists = parkingListContainer.getElementsByClassName("list-group-item list-group-item-action");


for (var i = 0; i < parkingLists.length; i++) {
  parkingLists[i].addEventListener("click", updateDOM);
}


function updateDOM() {
  var selected = document.getElementsByClassName("list-group-item list-group-item-action active");
  selected[0].className = selected[0].className.replace("active", " ");
  this.className += "list-group-item list-group-item-action active";
  document.getElementById("title").innerHTML = this.innerHTML;
}
