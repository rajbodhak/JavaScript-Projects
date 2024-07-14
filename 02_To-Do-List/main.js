
const plus = document.querySelector('.plus');
const taskSpace = document.querySelector('.task-space');
const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");
const calendarContainer = document.querySelector('.calendar-container');
const addTaskSection = document.querySelector('.add-task-section'); 

//Function to create Task div
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

    // Function to create tool element with icon
    function createToolElement(iconClass, color) {
        const toolDiv = document.createElement('div');
        toolDiv.className = 'tool'; 

        const icon = document.createElement('i');
        icon.className = 'fa-solid ' + iconClass;
        icon.style.color = color;

        toolDiv.appendChild(icon);
        return toolDiv;
    }

    const editTool = createToolElement('fa-pencil', '#9395d3');
    toolsDiv.appendChild(editTool);

    const deleteTool = createToolElement('fa-trash', '#9395d3');
    toolsDiv.appendChild(deleteTool);

    const completeTool = createToolElement('fa-circle-check', '#9395d3');
    toolsDiv.appendChild(completeTool);

    tasksDiv.appendChild(toolsDiv);

    return tasksDiv;
}



//Calendar
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const manipulate  = () => {

    //First day of month
    let dayOne = new Date(year, month, 1).getDay();

    //Last Date of month
    let lastDate = new Date(year, month + 1, 0).getDate();

    //Last Day of the month
    let dayLast = new Date(year, month, lastDate).getDay();

    //Last Date of Previous month
    let lastMonthLastDate = new Date(year, month, 0).getDate();

    let lit = "";

    //loop to add last dates of the previous months 
    for(let i = dayOne; i > 0; i--) {
        lit += `<li class = "inactive">${lastMonthLastDate - i + 1}</li>`;
    }

    //loop to add the current month dates
    for(i = 1; i<=lastDate; i++) {
        let isToday = i === date.getDate() 
            && month === new Date().getMonth() 
            && year === new Date().getFullYear() 
            ? "active" 
            : "";
        lit += `<li class = ${isToday}>${i}</li>`;
    }

    // Calculate the total number of days displayed
    const totalDisplayedDays = dayOne + lastDate + (6 - dayLast);

    // Calculate the number of days to add from the next month
    const remainingDays = 42 - totalDisplayedDays;

    //loop to add first dates of the next months
    for(let i = dayLast; i < 6 + remainingDays; i++) {
        lit += `<li class = "inactive">${i - dayLast + 1}</li>`;
    }

    currdate.innerText = `${months[month]} ${year}`;

    day.innerHTML = lit;
}

manipulate();

prenexIcons.forEach(icon => {
    
    icon.addEventListener('click', () => {
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        if(month < 0 || month > 11) {

            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();

        }

        else {
            date = new Date();
        }

    manipulate();    
    });
});


//Plus button manipulation


plus.addEventListener('click', () => {
    calendarContainer.style.display = 'none';
    addTaskSection.style.display = 'block';
});

