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
const updateBtn = document.getElementById('update');
const calcelBtn = document.getElementById('cancel');
const taskDiv = document.querySelector('.tasks-div');

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
function createTaskElement(title, description) {
    const tasksDiv = document.createElement('div');
    tasksDiv.className = 'tasks-div';

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
    editTool.querySelector('i').addEventListener('click', editTask)
    toolsDiv.appendChild(editTool);

    const deleteTool = createToolElement('fa-trash');
    deleteTool.querySelector('i').addEventListener('click', deleteTask);
    toolsDiv.appendChild(deleteTool);

    const completeTool = createToolElement('fa-circle-check');
    toolsDiv.appendChild(completeTool);

    tasksDiv.appendChild(toolsDiv);

    return tasksDiv;
}

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
});

backIconTask.addEventListener('click', () => {
    calendarContainer.style.display = 'block';
    addTaskSection.style.display = 'none';
});

backIconEdit.addEventListener('click', () => {
    calendarContainer.style.display = 'block';
    editTaskSection.style.display = 'none';
})

addBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const detail = detailInput.value;

    if (title !== '' && detail !== '') {
        const taskElement = createTaskElement(title, detail);
        taskSpace.appendChild(taskElement);

        titleInput.value = '';
        detailInput.value = '';
    }
});


//Edit Button Manipulation

function editTask(event) {
    calendarContainer.style.display = 'none';
    addTaskSection.style.display = 'none';
    editTaskSection.style.display = 'block';

    taskDiv.style.display = 'none';
}

updateBtn.addEventListener('click', () => {
    
});