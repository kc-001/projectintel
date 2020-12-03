const segmentContainer = document.querySelector('[segment-data]')
const newSegmentForm = document.querySelector('[data-new-segment-form]')
const newSegmentInput = document.querySelector('[data-new-segment-input]')
const deleteSegmentButton = document.querySelector('[data-delete-segment-button]')

const subSegmentDisplayContainer = document.querySelector('[data-subSegment-display-container]')
const subSegmentContainer = document.querySelector('[subSegment-data]')
const newSubSegmentForm = document.querySelector('[data-new-subSegment-form]')
const newSubSegmentInput = document.querySelector('[data-new-subSegment-input]')
const subSegmentTitle = document.querySelector('[data-subSegment-title]')
const deleteSubSegmentButton = document.querySelector('[data-delete-subSegment-button]')

const LOCAL_STORAGE_SEGMENT_KEY = 'segment.list'
const LOCAL_STORAGE_SELECTED_SEGMENT_ID = 'segment.selectedSegmentID'
let segment = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEGMENT_KEY)) || []
let selectedSegmentID = localStorage.getItem(LOCAL_STORAGE_SELECTED_SEGMENT_ID)

segmentContainer.addEventListener('click', e=>{
	if(e.target.tagName.toLowerCase() === 'li'){
		selectedSegmentID = e.target.dataset.segmentId
		saveAndRender()
	}
})

subSegmentContainer.addEventListener('click', e=> {
	if (e.target.tagName.toLowerCase() === 'li'){
		const selectedSegment = segment.find(segmentlist => segmentlist.id === selectedSegmentID)
		const selectedSubSegment = selectedSegment.subSegments.find(subSegment => subSegment.id === e.target.id)
		save()
	}
})

deleteSegmentButton.addEventListener('click', e=>{
	segment = segment.filter(segment => segment.id !== selectedSegmentID)
	selectedSegmentID = null
	saveAndRender()
})

deleteSubSegmentButton.addEventListener('click', e=>{
	subSegment = subSegment.filter(subSegment => subSegment.id !== selectedSubSegment)
	selectedSubSegment = null
	saveAndRender()
})

newSegmentForm.addEventListener('submit', e=>{
	e.preventDefault()
	const segmentName = newSegmentInput.value
	if (segmentName == null || segmentName ==='')return
		const segmentlist = createSegment(segmentName)//WEIRD LINE<-----
	newSegmentInput.value = null
	segment.push(segmentlist)
	saveAndRender()
})

newSubSegmentForm.addEventListener('submit', e=>{
	e.preventDefault()
	const subSegmentName = newSubSegmentInput.value
	if (subSegmentName == null || subSegmentName ==='')return
		const subSegment = createSubSegment(subSegmentName)
	newSubSegmentInput.value = null
	const selectedSegment = segment.find(segmentlist => segmentlist.id === selectedSegmentID)
	selectedSegment.subSegments.push(subSegment)
	saveAndRender()
})

function createSegment(name){
	return{id: Date.now().toString(), name: name, subSegments: []}
}

function createSubSegment(name){
	return{id: Date.now().toString(), name: name, task:[]}
}

function saveAndRender(){
	save()
	render()
}

function save(){
	localStorage.setItem(LOCAL_STORAGE_SEGMENT_KEY, JSON.stringify(segment))
	localStorage.setItem(LOCAL_STORAGE_SELECTED_SEGMENT_ID, selectedSegmentID)
}

function render(){
	clearElement(segmentContainer)
	renderSegment()
	const selectedSegment = segment.find(segmentlist => segmentlist.id === selectedSegmentID)
	if (selectedSegmentID == null){
		subSegmentDisplayContainer.style.display = 'none'
	} else{
		subSegmentDisplayContainer.style.display =''
		subSegmentTitle.innerText = selectedSegment.name
		clearElement(subSegmentContainer)
		renderSubSegment(selectedSegment)
	}
}

function renderSubSegment(selectedSegment){
	selectedSegment.subSegments.forEach(subSegment =>{
		const subSegmentElement = document.createElement('li')
		subSegmentContainer.appendChild(subSegmentElement)
	})
}

function renderSegment(){
		segment.forEach(segmentlist =>{
		const segmentElement = document.createElement('li')
		segmentElement.dataset.segmentId = segmentlist.id
		segmentElement.classList.add("segment-li")
		segmentElement.innerText = segmentlist.name
		if (segmentlist.id === selectedSegmentID){
			segmentElement.classList.add('active')
		}
		segmentContainer.appendChild(segmentElement)
	})
}

function clearElement(element){
	while(element.firstChild){
		element.removeChild(element.firstChild)
	}
}
render()

console.log(segment)
