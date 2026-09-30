function refreshTaskCount() {  
    var taskItems = document.querySelectorAll("#taskList li");  
    var countDisplay = document.getElementById("taskCounter");  
    countDisplay.innerText = "TOTAL TASKS: " + taskItems.length;  
}  

// Save tasks to localStorage
function saveTasks() {
    var tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(li) {
        var taskText = li.querySelector("span") ? li.querySelector("span").textContent : li.textContent.replace(/Edit|Delete/g, '').trim();
        tasks.push(taskText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";     
    tasks.forEach(function(task) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.textContent = task;
        li.appendChild(span);
        
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "<i class=\"fas fa-edit\"></i> Edit";
        editBtn.className = "taskBtn btn-edit";
        li.appendChild(editBtn);
        
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class=\"fas fa-trash-alt\"></i> Delete";
        deleteBtn.className = "taskBtn btn-delete";
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
        setupTaskButtons(li);
    });
    refreshTaskCount();
}

function insertNewTask() {  
    var inputField = document.getElementById("textInput");   
    if (inputField.value.trim() === "") {  
        alert("Please type a real task!");  
        return;  
    }  

    var taskItem = document.createElement("li");  
    var taskText = document.createElement("span");
    taskText.textContent = inputField.value;
    taskItem.appendChild(taskText);
    
    var editBtn = document.createElement("button");
    editBtn.innerHTML = "<i class=\"fas fa-edit\"></i> Edit";
    editBtn.className = "taskBtn btn-edit";
    taskItem.appendChild(editBtn);
    
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class=\"fas fa-trash-alt\"></i> Delete";
    deleteBtn.className = "taskBtn btn-delete";
    taskItem.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(taskItem);  
    inputField.value = "";   
    refreshTaskCount();
    setupTaskButtons(taskItem);

    saveTasks(); 
}  

var galleryImages = [  
    "icon2.png",  
    "icon3.png",  
    "icon2.png",  
    "icon3.png",
    "icon2.png",
    "icon3.png"
];  

var galleryIndex = 0;  

function updateGalleryImages() {  
    var pictureElements = document.querySelectorAll(".containerforimg img");  
    galleryIndex++; 
    if (galleryIndex >= galleryImages.length) 
    { 
        galleryIndex = 0;
    }
    
    for (var i = 0; i < pictureElements.length; i++) {
        var imagePosition = (galleryIndex + i) % galleryImages.length; 
        pictureElements[i].src = galleryImages[imagePosition]; 
    }
}  

function changeImageSize(event) {  
    if (event.target.tagName === "IMG") {  
        if (event.target.style.transform === "scale(1.5)") 
        {  
            event.target.style.transform = "scale(1)";   
        } else {  
            event.target.style.transform = "scale(1.5)";   
        }  
        event.target.style.transition = "transform 0.3s ease-in-out";  
    }  
}  

function setupTaskButtons(taskItem) {
    var buttons = taskItem.querySelectorAll(".taskBtn");
    buttons.forEach(function(btn) {
        btn.onclick = function(e) {
            e.stopPropagation();        
            if (btn.classList.contains("btn-delete") || btn.textContent.includes("Delete")) {
                taskItem.style.opacity = '0';
                setTimeout(() => {
                    taskItem.remove();
                    refreshTaskCount();
                    saveTasks(); 
                }, 300);
            } else {
                var currentText = taskItem.querySelector("span") ? taskItem.querySelector("span").textContent : taskItem.textContent.replace(/Edit|Delete/g, '').trim();
                var newText = prompt("Edit task:", currentText);
                if (newText !== null && newText.trim() !== "") {
                    if (taskItem.querySelector("span")) {
                        taskItem.querySelector("span").textContent = newText.trim();
                    } else {
                        taskItem.innerHTML = '<span>' + newText.trim() + '</span> <button class="taskBtn btn-edit"><i class="fas fa-edit"></i> Edit</button> <button class="taskBtn btn-delete"><i class="fas fa-trash-alt"></i> Delete</button>';
                        setupTaskButtons(taskItem);
                    }
                    saveTasks(); 
                }
            }
        };
    });
}

document.addEventListener("DOMContentLoaded", function() {  
    loadTasks(); 

    refreshTaskCount();  
    document.getElementById("addItem").onclick = insertNewTask;  

    var existingTasks = document.querySelectorAll("#taskList li");
    existingTasks.forEach(function(task) {
        setupTaskButtons(task);
    });

    document.getElementById("removeItem").addEventListener("click", function() {  
        if(confirm("Are you sure you want to clear all tasks?")) {
            var taskList = document.getElementById("taskList");
            taskList.style.opacity = '0';
            setTimeout(() => {
                taskList.innerHTML = "";  
                taskList.style.opacity = '1';
                refreshTaskCount();  
                saveTasks();
            }, 300);
        }
    });  
    
    document.getElementById("galleryButton").addEventListener("click", updateGalleryImages);  
});
