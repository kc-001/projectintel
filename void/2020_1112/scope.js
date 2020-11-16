//https://www.w3schools.com/howto/howto_js_todolist.asp
// Create a "close" button and append it to each list item
function closeAndArrows (){
	var myNodelist = document.getElementsByTagName("li");
	var i;
	for (i = 0; i < myNodelist.length; i++) {
		var span = document.createElement("SPAN");
		var spanUp = document.createElement("SPAN");
		var spanDown = document.createElement("SPAN");
		var spanLeft = document.createElement("SPAN");
		var spanRight = document.createElement("SPAN");

		var cls = document.createTextNode("\u00D7");
		var up = document.createTextNode("\u2191");
		var down = document.createTextNode("\u2193");
		var left = document.createTextNode("\u2190");
		var right = document.createTextNode("\u2192");

		span.className = "close";
		span.appendChild(cls);

		spanUp.className = "up";
		spanUp.appendChild(up);

		spanDown.className = "down";
		spanDown.appendChild(down);

		spanLeft.className = "left";
		spanLeft.appendChild(left);

		spanRight.className = "right";
		spanRight.appendChild(right);

		myNodelist[i].appendChild(span);
		myNodelist[i].appendChild(spanUp);
		myNodelist[i].appendChild(spanDown);
		myNodelist[i].appendChild(spanLeft);
		myNodelist[i].appendChild(spanRight);
	}
}
closeAndArrows();

// Click on a close button to hide the current list item
// Create Up and Down Arrows for moving list items
// https://stackoverflow.com/questions/46724542/javascript-move-elements-up-and-down-in-the-list
// https://www.viralpatel.net/listbox-select-all-move-left-right-up-down-javascript/

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		var div = this.parentElement;
		div.style.display = "none";
	}
}

var upLink = document.getElementsByClassName("up");
var j;
for (j = 0; j < upLink.length; j++) {
	upLink[j].onclick = function () {
		var wrapper = this.parentNode;

		if (wrapper.previousElementSibling)
			wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling);
	}
}

var downLink = document.getElementsByClassName("down");
var k;
for (k = 0; k < downLink.length; k++) {
	downLink[k].onclick = function () {
		var wrapper = this.parentNode;

		if (wrapper.nextElementSibling)
			wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper);
	}
}

// Add a "checked" symbol when clicking on a list item
	//Adding time stamped date to the list item when checked
	const datePull = new Date();
	const timeStamp = datePull.getFullYear()+'-'+(datePull.getMonth()+1)+'-'+datePull.getDate();
	//
	var list = document.querySelector('ul');
	console.log(list.innerHTML);
	list.addEventListener('click', function(ev) {
		if (event.target.tagName === 'LI') {
			event.target.classList.toggle('checked');
		}
	}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
	var li = document.createElement("li");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
	}
	document.getElementById("myInput").value = "";

	closeAndArrows();

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
		}
	}
}

