const plus = document.querySelector('.plus');
const taskSpace = document.querySelector('.task-space');
const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");
const calendarContainer = document.querySelector('.calendar-container');
const addTaskSection = document.querySelector('.add-task-section');
const editTaskSection = document.querySelector('.edit-task-section');
const backIconTask = document.querySelector('#back-icon-task');
const backIconEdit = document.querySelector('#back-icon-edit');
const addBtn = document.querySelector('#add-btn');
const editIcon = document.querySelector('.fa-pencil');
const titleInput = document.querySelector('#title-input');
const detailInput = document.querySelector('#detail-input');
const updateBtn = document.querySelector('#update');
const cancelBtn = document.querySelector('#cancel');
const taskDiv = document.querySelector('.tasks-div');
const editTitle = document.querySelector('#edit-input');
const editDetail = document.querySelector('#edit-detail');
const completeTaskspace = document.querySelector('.complete-container');

// Calendar setup
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const manipulate = () => {
    let dayOne = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    let dayLast = new Date(year, month, lastDate).getDay();
    let lastMonthLastDate = new Date(year, month, 0).getDate();
    let lit = "";

    for (let i = dayOne; i > 0; i--) {
        lit += `<li class="inactive">${lastMonthLastDate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    const totalDisplayedDays = dayOne + lastDate + (6 - dayLast);
    const remainingDays = 42 - totalDisplayedDays;

    for (let i = 1; i <= remainingDays; i++) {
        lit += `<li class="inactive">${i}</li>`;
    }

    currdate.innerText = `${months[month]} ${year}`;
    day.innerHTML = lit;
}

manipulate();

prenexIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }

        manipulate();
    });
});

// Function to create Task div
let taskIdCounter = 0; 

function createTaskElement(id, title, description) {
    const tasksDiv = document.createElement('div');
    tasksDiv.className = 'tasks-div';
    tasksDiv.dataset.taskId = id; // Set a data attribute for the task ID

    const taskDiv = document.createElement('div');
    taskDiv.className = 'tasks';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.textContent = title;
    taskDiv.appendChild(titleDiv);

    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail';
    detailDiv.textContent = description;
    taskDiv.appendChild(detailDiv);

    tasksDiv.appendChild(taskDiv);

    const toolsDiv = document.createElement('div');
    toolsDiv.className = 'tools';

    const editTool = createToolElement('fa-pencil');
    editTool.querySelector('i').addEventListener('click', () => editTask(id));
    toolsDiv.appendChild(editTool);

    const deleteTool = createToolElement('fa-trash');
    deleteTool.querySelector('i').addEventListener('click', deleteTask);
    toolsDiv.appendChild(deleteTool);

    const completeTool = createToolElement('fa-circle-check');
    completeTool.querySelector('i').addEventListener('click', () => addCompleteTask(id));
    toolsDiv.appendChild(completeTool);

    tasksDiv.appendChild(toolsDiv);

    return tasksDiv;
}

function addNewTask(title, description) {
    const taskId = taskIdCounter++;
    const taskElement = createTaskElement(taskId, title, description);
    document.querySelector('.task-space').appendChild(taskElement);
}

addBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const detail = detailInput.value;

    if (title.trim() !== '' && detail.trim() !== '') {
        titleInput.value = '';
        detailInput.value = '';
        
        addNewTask(title, detail);
    }
});

function createToolElement(iconClass) {
    const toolDiv = document.createElement('div');
    toolDiv.className = 'tool';

    const icon = document.createElement('i');
    icon.className = 'fa-solid ' + iconClass;

    toolDiv.appendChild(icon);
    return toolDiv;
}

function deleteTask(event) {
    const targetDiv = event.target.closest('.tasks-div');
    if (targetDiv) {
        targetDiv.remove();
    }
}

// Plus button manipulation
plus.addEventListener('click', () => {
    calendarContainer.style.display = 'none';
    addTaskSection.style.display = 'block';
    editTaskSection.style.display = 'none';
});

backIconTask.addEventListener('click', () => {
    calendarContainer.style.display = 'block';
    addTaskSection.style.display = 'none';
});

backIconEdit.addEventListener('click', () => {
    calendarContainer.style.display = 'block';
    editTaskSection.style.display = 'none';
})

//Edit Button Manipulation

function editTask(taskId) {
    // Show the edit task section
    const taskElement = document.querySelector(`.tasks-div[data-task-id='${taskId}']`);
    const title = taskElement.querySelector('.title').textContent;
    const detail = taskElement.querySelector('.detail').textContent;

    editTitle.value = title;
    editDetail.value = detail;    

    editTaskSection.style.display = 'block';
    addTaskSection.style.display = 'none';
    calendarContainer.style.display = 'none';

    editTaskSection.setAttribute('data-current-task-id', taskId);
}

updateBtn.addEventListener('click', () => {
    const taskId = editTaskSection.getAttribute('data-current-task-id');
    const taskElement = document.querySelector(`.tasks-div[data-task-id = '${taskId}']`);
    console.log(taskElement);

    const newTitle = editTitle.value;
    const newDetail = editDetail.value;

    taskElement.querySelector('.title').textContent = newTitle;
    taskElement.querySelector('.detail').textContent = newDetail;

    editTaskSection.style.display = 'none';
    calendarContainer.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
    editTaskSection.style.display = 'none';
    calendarContainer.style.display = 'block';
});

//Completed Task Section

function addCompleteTask(taskId) {
    const taskElement = document.querySelector(`.tasks-div[data-task-id = '${taskId}']`);
    if(taskElement) {
        completeTaskspace.appendChild(taskElement);
    } 
};