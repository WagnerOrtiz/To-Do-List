const input = document.querySelector('#input')
const plusButton = document.querySelector('#plus-button')
const tasks = document.querySelector('#tasks')

input.addEventListener('keypress', (e) => {
    if(e.which === 13){
        input.value ?  addingNewTask(input.value) : alert('Digite uma tarefa')
    }else{
        return
    }
})
plusButton.addEventListener('click', () => {
    input.value ? addingNewTask(input.value) :  alert('Digite uma tarefa')
})


function addingNewTask(value){
        const newTaskBox = document.createElement('div')
        const newTask = document.createElement('li')
        const trashButton = document.createElement('button')

        newTask.innerHTML = value
        trashButton.className = 'trash-button'
        trashButton.innerHTML = '<i class="far fa-trash-alt"></i>'
        trashButton.addEventListener('click', (e) => {deleteItem(e)})

        newTaskBox.className = 'new-task-box'
        newTaskBox.append(newTask)
        newTaskBox.append(trashButton)

        tasks.append(newTaskBox)
        saveTaskInMemory()
        cleanInput()
}

function cleanInput(){
    input.value = ''
    input.focus()
}
function deleteItem(e){ 
    const clickedParent = e.target.parentElement   // due to the DOM tree, we gotta remove the grand-parent of the clicked element. Here we get the clicked elenet's parent...
    clickedParent.parentElement.remove()           // ...and here we remove what we really want.

    saveTaskInMemory()
}
function saveTaskInMemory(){
    const tasks = document.querySelectorAll('li')
    const tasksList = []

    tasks.forEach((value, index) => {
        tasksList.push(value.innerText)
    })

    const taskJSON = JSON.stringify(tasksList)
    localStorage.setItem('mySavedTasks' , taskJSON)    // Save in Browser
}
function addSavedTasks(){
    const savedTasks = localStorage.getItem('mySavedTasks')
    const tasksList = JSON.parse(savedTasks)
    
    if(tasksList){
        tasksList.forEach(value => {
            addingNewTask(value)
        })
    }
}

addSavedTasks()         // Thats the first thing our JS is gonna do: check whether there is any saved value in memory to be built on screen.