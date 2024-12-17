const apiKey =  "67617a9c60a208ee1fde3c7a";

const addBtn = document.querySelector(`button`);
const input = document.querySelector(`input`)
const loading = document.querySelector(`#loading`)
let todos = [];

async function addToDo()
{
	showLoader()
	let data ={
		title: input.value,
		apiKey
	}
	addTodoOperation(`POST` , data )
}

function showLoader()
{
	loading.classList.replace(`d-none` , `d-flex`)
}

async function getAllToDo()
{
	const response = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`)
	const date = await response.json() 
	todos = date.todos;
	loading.classList.replace( `d-flex` , `d-none`);
	displayToDos();
}
getAllToDo()

function displayToDos()
{
	display =``;
	for (let i=0; i< todos.length; i++) 
		{
			display +=`
			<div class="alert ${todos[i].completed ? 'alert-secondary': 'alert-danger'} d-flex justify-content-between align-content-center">
       			 <p class="mb-0">${todos[i].title}</p>
				 <div>
				  <button class="btn ${todos[i].completed ? 'd-none' : ''}" onclick="markAsCompleted('${todos[i]._id}')" >&#10003;</button> 
				 <button class="btn" onclick="deleteToDo('${todos[i]._id}')" >&#9747;</button> 
                </div>
				 </div>
				
			`
	    }
		document.querySelector(`#todo`).innerHTML = display
}

async function markAsCompleted(id)
{
	let data = {todoId : id}
	addTodoOperation(`PUT` , data )
	showLoader()
}

async function deleteToDo(id)
{
	let data = {todoId : id}
	addTodoOperation(`DELETE` , data )
	showLoader()
}

async function addTodoOperation( method , data )
{
		
	const resposne = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
		method :method,
		headers :{
					"Content-Type": "application/json",
	             },
		body : JSON.stringify(data)		 
	})
	const res = await resposne.json();
	getAllToDo();
}

addBtn.addEventListener(`click` , addToDo)


