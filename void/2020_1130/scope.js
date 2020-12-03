// <----------------------------------------Segment Part---------------------------------------------->
addTaskInTable();
let addTask = document.getElementById("add");
let btn = document.getElementById("btnAdd");
let dlt = document.getElementById("delete");

// Creating LocalStorge for Segments
btn.addEventListener("click", function() {
	addTaskValue = addTask.value;
	if(addTaskValue.trim() !=0){
		let webTask = localStorage.getItem("LocalTask");
		if (webTask == null) {
		taskObj = [];
		}
		else{
			taskObj = JSON.parse(webTask);
		}
		taskObj.push(addTaskValue);
		localStorage.setItem("LocalTask" , JSON.stringify(taskObj));
		addTaskInTable();
		addTask.value = "";
	}
	else{
		alert("Cannot add null value")
	}
})
//  Adding new Values in the Segment
function addTaskInTable(){
	let webTask = localStorage.getItem("LocalTask");
		if (webTask == null) {
		taskObj = [];
		}
		else{
			taskObj = JSON.parse(webTask);
		}
	let html = '';
	let table = document.getElementById("table");
	taskObj.forEach((item, index) => {
		html += `<tr>
					<!--<th>${index + 1}.</th>-->
					<th>.</th>
					<td onclick="subtask(${index})" id="segment">${item}</td>
					<td><button onclick="delt(${index})"> - </button></td>
				</tr>`;
	})
	table.innerHTML = html;
}
// Deleting segment with its sub segment and tasks
function delt(index){
	let webTask = localStorage.getItem("LocalTask");
	let taskObj = JSON.parse(webTask);
	taskObj.splice(index, 1);
	localStorage.setItem("LocalTask" , JSON.stringify(taskObj));
	addTaskInTable();
	let webSubTask = localStorage.getItem("LocalSubTask" + index);
	localStorage.removeItem("LocalSubTask" + index);
	addSubTaskInTable(index);
	let subdiv = document.getElementById("subTaskDiv");
	if (subdiv.innerHTML != '') {
		subdiv.innerHTML = '';
	}
	let webSubTaskValue = localStorage.getItem("LocalSubTaskValue" + index);
	localStorage.removeItem("LocalSubTaskValue" + index);
	addValueInSubTaskTable(index);
	let addTask = document.getElementById("addTask");
	if (addTask.innerHTML != '') {
		addTask.innerHTML = '';
	}
}

//<----------------------------------------Sub Segment Part---------------------------------------------->\
// Creating Div for Sub segments
function subtask(index){
	let webTask = localStorage.getItem("LocalTask");
		if (webTask == null) {
		taskObj = [];
		}
		else{
			taskObj = JSON.parse(webTask);
		}
	let html = '';
	let subdiv = document.getElementById("subTaskDiv");
		html += `<h2> ${taskObj[index]} (Sub segment)</h2>
				<input type="text" id="addSub" placeholder="Enter new sub segment">
				<button id="btnAddSub" onclick="addSubTask(addSub.value , ${index})"> + </button>
				<table id="subTable">
					
				</table>`;
	subdiv.innerHTML = html;
	addSubTaskInTable(index);
	let taskdiv = document.getElementById("addTask");
	taskdiv.innerHTML ='';
}

// Creating LocalStorage for each Sub segment
function addSubTask(text, index){
	addSubTaskValue = text;
	if(addSubTaskValue.trim() !=0){
		let webSubTask = localStorage.getItem("LocalSubTask" + index);
		if (webSubTask == null) {
		taskSubObj = [];
		}
		else{
			taskSubObj = JSON.parse(webSubTask);
		}
		taskSubObj.push(addSubTaskValue);
		localStorage.setItem("LocalSubTask" + index, JSON.stringify(taskSubObj));
		addSubTaskInTable(index);
		let addSub = document.getElementById("addSub");
		addSub.value = '';
	}
	else{
		alert("Cannot add null value")
	}
}

// Adding new values in the Sub segment
function addSubTaskInTable(index){
	let webSubTask = localStorage.getItem("LocalSubTask" + index);
		if (webSubTask == null) {
		taskSubObj = [];
		}
		else{
			taskSubObj = JSON.parse(webSubTask);
		}
	let subhtml = '';
	let subtable = document.getElementById("subTable");
	taskSubObj.forEach((item, index) => {
		subhtml += `<tr>
					<th>.</th>
					<td onclick="addWork(${index})" id="segment">${item}</td>
					<td><button onclick="dltSubSegment(${index})"> - </button></td>
				</tr>`;
	})
	subtable.innerHTML = subhtml;
}
// Deleting sub segment with realted tasks
function dltSubSegment(index){
	let webSubTask = localStorage.getItem("LocalSubTask" + index);
	let taskSubObject = JSON.parse(webSubTask);
	taskSubObject.splice(index, 1);
	localStorage.setItem("LocalSubTask" + index, JSON.stringify(taskSubObject));
	addSubTaskInTable(index);
	let webSubTaskValue = localStorage.getItem("LocalSubTaskValue" + index);
	localStorage.removeItem("LocalSubTaskValue" + index);
	addValueInSubTaskTable(index);
	let addTask = document.getElementById("addTask");
	if (addTask.innerHTML != '') {
		addTask.innerHTML = '';
	}
}

// <----------------------------------------Tasks Part---------------------------------------------->
// Creating Div for Tasks
function addWork(index){
	let webSubTask = localStorage.getItem("LocalSubTask");
		if (webSubTask == null) {
		taskSbObj = [];
		}
		else{
			taskSubObj = JSON.parse(webSubTask);
		}
	let html = '';
	let subdiv = document.getElementById("addTask");
		html += `<h2> ${taskSubObj[index]} (Tasks)</h2>
				<input type="text" id="valueOfTask" placeholder="Enter new task"/>
				<button id="btnAddSubTask" onclick="addValueInTask(valueOfTask.value, ${index})"> + </button>
				<table id="taskTable">
					
				</table>`;
	subdiv.innerHTML = html;
	addValueInSubTaskTable(index);
}
// Creating loclStorage for each Task
function addValueInTask(text, index){
	addValueOfTask = text;
	if(addValueOfTask.trim() !=0){
		let webSubTaskValue = localStorage.getItem("LocalSubTaskValue" + index);
		if (webSubTaskValue == null) {
		taskSubValueObj = [];
		}
		else{
			taskSubValueObj = JSON.parse(webSubTaskValue);
		}
		taskSubValueObj.push(addValueOfTask);
		localStorage.setItem("LocalSubTaskValue" + index, JSON.stringify(taskSubValueObj));
		addValueInSubTaskTable(index);
		let valueOfTask = document.getElementById("valueOfTask");
		valueOfTask.value = '';
	}
	else{
		alert("Cannot add null value")
	}
}
// Adding new Values to the Tasks
function addValueInSubTaskTable(index){
	let webSubTaskValue = localStorage.getItem("LocalSubTaskValue" + index);
		if (webSubTaskValue == null) {
		taskSubValueObj = [];
		}
		else{
			taskSubValueObj = JSON.parse(webSubTaskValue);
		}
	let subhtml = '';
	let subtable = document.getElementById("taskTable");
	taskSubValueObj.forEach((item, index) => {
		subhtml += `
					<input type="checkbox">
					<label id="tsk">${item}</label>
					<button onclick="deleteTask(${index})"> - </button>
					<br/>`;
	})
	subtable.innerHTML = subhtml;
}
// Deleting Tasks
function deleteTask(index){
	let webSubTaskValue = localStorage.getItem("LocalSubTaskValue" + index);
	let taskSubValueObj = JSON.parse(webSubTaskValue);
	taskSubValueObj.splice(index, 1);
	localStorage.setItem("LocalSubTaskValue" + index, JSON.stringify(taskSubValueObj));
	addValueInSubTaskTable(index);
}