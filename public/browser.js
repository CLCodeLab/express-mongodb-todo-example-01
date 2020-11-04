/*
TITLE: DOM OBJECTS*/
const createForm = document.getElementById('create-form')
const createField = document.getElementById('create-field')
const itemList = document.getElementById('item-list')

/*
TITLE: LIST ITEM HTML TEMPLATE*/
const itemTemplate = item =>{
	return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
	<span class="item-text">${item.item}</span>
	<div>
		<button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
		<button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
	</div>
</li>`
}

/*
TITLE: GENERATE AND LOAD ITEMS LIST HTML
NOTE: THE 'ITEMS' VARIABLE IS AVAILABLE THROUGHOUT THE ENTIRE CODE*/
const listHTML = items.map(item=>{
	return itemTemplate(item)
}).join('')
itemList.insertAdjacentHTML('beforeend', listHTML)

createForm.addEventListener('submit', e=>{
	e.preventDefault()
	const fieldValue = createField.value
	if (fieldValue !== "") {
		axios
		.post('/create-item', { item: fieldValue})
		.then((response) => {
			//ADD ITEM
			const item = response.data
			itemList.insertAdjacentHTML('beforeend',itemTemplate(item))
			createField.value=""
			createField.focus()
		})
		.catch(e => {
			console.log('Error occured during the create process :>> ', e)
		})
	}
})

document.addEventListener('click', e => {
	/*
	NOTE: DELETE ITEM */
	if (e.target.classList.contains('delete-me')) {
		const parentElement = e.target.parentElement.parentElement
		const elementValue = parentElement.querySelector('.item-text').innerHTML
		const elementId = e.target.getAttribute('data-id')
		const confirmDelete = confirm(`Are you sure you want to permenantly delete "${elementValue}"?`)
		if (confirmDelete) {
			axios
				.post('/delete-item', { id: elementId})
				.then(() => {
					parentElement.remove()
				})
				.catch(e => {
					console.log('Error occured during the delete process :>> ', e)
				})
		}
	}
	/*
	NOTE: UPDATE ITEM */
	if (e.target.classList.contains('edit-me')) {
		const itemText = e.target.parentElement.parentElement.querySelector(
			'.item-text'
		)
		const elementValue = itemText.innerHTML
		const elementId = e.target.getAttribute('data-id')
		const userInput = prompt(
			'Enter the value you want to change:',
			elementValue
		)
		if (userInput) {
			axios
				.post('/update-item', { id: elementId, item: userInput })
				.then(() => {
					itemText.innerHTML = userInput
				})
				.catch(e => {
					console.log('Error occured during changing of value :>> ', e)
				})
		}
	}
})
