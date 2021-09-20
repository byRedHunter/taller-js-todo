const form = document.querySelector('#form-task')
const task = document.querySelector('#task')
const tasks = document.querySelector('#task-list')
let tasksStorage = []

const addStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(tasksStorage))
}

class Task {
	constructor(task) {
		this.create(task)
	}

	create(task) {
		const li = document.createElement('li')

		const p = document.createElement('p')
		p.textContent = task.task
		task.complet && p.setAttribute('class', 'task-completed')

		const completed = document.createElement('button')
		completed.setAttribute('class', 'btn btn-primary')
		completed.textContent = 'Marcar'

		const delet = document.createElement('button')
		delet.setAttribute('class', 'btn btn-danger')
		delet.textContent = 'Eliminar'

		li.appendChild(p)
		li.appendChild(completed)
		li.appendChild(delet)

		tasks.appendChild(li)
		tasksStorage.push(task)

		addStorage()

		completed.addEventListener('click', () =>
			this.complete(p, completed, task.id)
		)
		delet.addEventListener('click', () => this.delete(li, task.id))
	}

	delete(li, id) {
		tasksStorage.forEach((task) => {
			if (task.id === id) {
				tasksStorage.splice(id - 1, 1)
			}
		})

		addStorage()
		tasks.removeChild(li)
	}

	complete(p, completed, id) {
		tasksStorage.forEach((task) => {
			if (task.id === id) {
				tasksStorage[id - 1].complet = !tasksStorage[id - 1].complet
			}
		})
		addStorage()

		p.classList.toggle('task-completed')

		if (p.classList.contains('task-completed')) {
			completed.textContent = 'Desmarcar'
		} else {
			completed.textContent = 'Marcar'
		}
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	if (task.value === '') {
		alert('Escriba una tarea para poder agregar.')
	} else {
		const id = tasksStorage.length + 1
		const taskItem = { id, task: task.value, complet: false }

		new Task(taskItem)
		task.value = ''
	}
})

window.onload = () => {
	const storage = JSON.parse(localStorage.getItem('tasks')) || []
	console.log(storage)

	if (storage.length > 0) {
		storage.forEach((task) => {
			new Task(task)
		})
	}
}
