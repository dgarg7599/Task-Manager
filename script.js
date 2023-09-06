const addTaskBtn = document.getElementById('addTask');
const taskNameInput = document.getElementById('taskName');
const assignedToInput = document.getElementById('assignedTo');
const categoriesSelect = document.getElementById('categories');
const taskDateInput = document.getElementById('taskDate');
const recordsDisplay = document.getElementById('records');

let taskArray = [];
let edit_id = null;

let objStr = localStorage.getItem('tasks');

if (objStr != null) {
    taskArray = JSON.parse(objStr);
}



DisplayTasks();

addTaskBtn.onclick = () => {
    const taskName = taskNameInput.value;
    const assignedTo = assignedToInput.value;
    const categories = categoriesSelect.value;
    const taskDate = taskDateInput.value;

    if (taskName.trim() === '' || assignedTo.trim() === '' || taskDate.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }

    if (edit_id !== null) {
        taskArray.splice(edit_id, 1, {
            'taskName': taskName,
            'assignedTo': assignedTo,
            'categories': categories,
            'taskDate': taskDate,
            'status': 'Incomplete' 
        });
        edit_id = null;
    } else {
        taskArray.push({
            'taskName': taskName,
            'assignedTo': assignedTo,
            'categories': categories,
            'taskDate': taskDate,
            'status': 'Incomplete'
        });
    }

    SaveTasks(taskArray);

    taskNameInput.value = '';
    assignedToInput.value = '';
    categoriesSelect.value = 'Work';
    taskDateInput.value = '';
    addTaskBtn.innerText = 'Add Task';
};

function SaveTasks(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem('tasks', str);
    DisplayTasks();
}

function DisplayTasks(tasksToShow) {
    let statement = '';

    const tasksToDisplay = tasksToShow || taskArray;

    tasksToDisplay.forEach((task, i) => {
        statement += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${task.taskName}</td>
            <td>${task.assignedTo}</td>
            <td>${task.categories}</td>
            <td>${task.taskDate}</td>
            <td>${task.status}</td>
            <td>
                <i class="uil uil-check-circle text-white btn mx-2 bg-success" id="completeTaskbtn"
                onclick='CompleteTask(${i})'></i>
                <i class="uil uil-edit text-white btn mx-2 bg-black" onclick='EditTask(${i})'></i>
                <i class="uil uil-times-circle text-white btn mx-2 bg-danger" onclick='DeleteTask(${i})'></i>
            </td>
        </tr>`;
    });

    recordsDisplay.innerHTML = statement;
}


function EditTask(id) {
    edit_id = id;
    const task = taskArray[id];
    taskNameInput.value = task.taskName;
    assignedToInput.value = task.assignedTo;
    categoriesSelect.value = task.categories;
    taskDateInput.value = task.taskDate;
    addTaskBtn.innerText = 'Save Changes';
}

function DeleteTask(id) {
    taskArray.splice(id, 1);
    SaveTasks(taskArray);
}

function CompleteTask(id) {
   
    if (taskArray[id].status === 'Incomplete') {
        taskArray[id].status = 'Complete';
       
    } else {
        taskArray[id].status = 'Incomplete';
        taskRow.style.textDecoration = 'none';
    }
    SaveTasks(taskArray);

    
    
}


const allTr = document.querySelectorAll('#records tr');
const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function (e) {
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML = ''; 
    allTr.forEach(tr => {
        const td_in_tr = tr.querySelectorAll('td');
        if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1 ||
            td_in_tr[1].innerText.toLowerCase().indexOf(searchStr) > -1 ||
            td_in_tr[2].innerText.toLowerCase().indexOf(searchStr) > -1 ||
            td_in_tr[3].innerText.toLowerCase().indexOf(searchStr) > -1) {
            recordsDisplay.appendChild(tr);
        }
    });

    if (recordsDisplay.innerHTML === '') {
        recordsDisplay.innerHTML = '<tr><td colspan="7">No Records Found</td></tr>';
    }

});
       





const filterOption = document.getElementById('filterOption');
filterOption.addEventListener('change', function () {
    const selectedOption = filterOption.value;
    let filteredTasks = [];

    if (selectedOption === 'all') {
        filteredTasks = taskArray;
    } else if (selectedOption === 'complete' || selectedOption === 'incomplete') {
        filteredTasks = taskArray.filter(task => task.status.toLowerCase() === selectedOption.toLowerCase());
    } else {
        filteredTasks = taskArray.filter(task => task.categories.toLowerCase() === selectedOption.toLowerCase());
    }
    console.log(filteredTasks);
    DisplayTasks(filteredTasks);
});


const sortTaskBtn = document.getElementById('sortTask');
sortTaskBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.taskName.localeCompare(b.taskName));
    DisplayTasks();
});

const sortAssignedToBtn = document.getElementById('sortAssignedTo');
sortAssignedToBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
    DisplayTasks();
});

const sortCategoriesBtn = document.getElementById('sortCategories');
sortCategoriesBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.categories.localeCompare(b.categories));
    DisplayTasks();
});

const sortDateBtn = document.getElementById('sortDate');
sortDateBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    DisplayTasks();
});





function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }


 