const alltask  = document.querySelector(".taskList ul");

// Add showNotification function
function showNotification() {
    const notificationContainer = document.getElementById("notificationContainer");
    notificationContainer.style.display  =  "block";

    // Reset the notification count
    document.getElementById("notificationCount").innerText = "0";
}

function addTask() {
    let taskName=document.getElementById("taskName").value;
    let taskDateTime = document.getElementById("timeInput").value;

    if(taskName!=""){
        var newDiv = document.createElement('div');
        newDiv.className += "card";
        var cardBody = document.createElement('div');
        cardBody.className += "card-body";

        var taskInfoContainer = document.createElement("div");
        taskInfoContainer.classList.add("taskContain");
        var h4 = document.createElement('h4');
        h4.className += "card-title";
        // h4.innerHTML = taskName;
        var pDatetime = document.createElement("p");
        pDatetime.className += "card-datetime";
        // pDatetime.innerHTML = taskDateTime;
        taskInfoContainer.innerHTML = `
        <div class="task-card">
            <table> 
                <tbody>
                    <tr>
                        <td class="task-info">${taskName}</td>
                        <td class="task-info">${taskDateTime}</td>
                        <td><button class="btn btn-danger deleteBtn" onclick="deleteTask(${alltask.childElementCount + 1})">Delete</button></td>
                    </tr>    
                </tbody>        
            </table>
        </div>`;

        cardBody.appendChild(taskInfoContainer);        
        newDiv.appendChild(cardBody);
        alltask.appendChild(newDiv);

        // Add a notification 
        addNotification(taskName, taskDateTime);
        // saveToLocalStorage();   
        localStorage.setItem(`${alltask.childElementCount}.name`,taskName);
        localStorage.setItem(`${alltask.childElementCount}.dateTime`,taskDateTime);
        document.getElementById("taskName").value ="";
        document.getElementById("timeInput").value ="";
    }else{
        alert("Please enter a valid name!");
    }   
}    

// Function to add notification
function addNotification(taskName, taskDateTime){
    const notificationContainer = document.getElementById("notificationContainer");
    const notificationCount = document.getElementById("notificationCount");

    const notification = document.createElement("div");
    notification.className = "notification-item";
    notification.innerHTML = `<p><strong>${taskName}</strong> - ${taskDateTime}</p>`;

    notificationContainer.appendChild(notification);

    // update notification count 
    const count = parseInt(notificationCount.innerText);
    notificationCount.innerText = (count + 1).toString();
}

// Function for close notification container
function closeNotificationContainer() {
    const notificationContainer = document.getElementById("notificationContainer");
    notificationContainer.style.display = "none";
}

function deleteTask(taskIndex) {
    console.log(`Deleting the task at index ${taskIndex}`);

    if(taskIndex < 1 || taskIndex > alltask.childElementCount) {
        console.error("Invalid Task Index");
        return;
    }

    const deletedTask = alltask.children[taskIndex - 1];
    const notificationContainer = document.getElementById("notificationContainer");
    const notification = notificationContainer.getElementsByClassName("notification-item");

    if(deletedTask){    
        deletedTask.remove();   

        // Remove the task from the task list 
        if (notification.length >= taskIndex) {
            notification[taskIndex - 1].remove();
        }
        // update notification count
        const notificationCount = document.getElementById("notifiactionCount");
        notificationCount.innerText = notificationCount.length.toString();

        localStorage.removeItem(`${taskIndex}.name`);
        localStorage.removeItem(`${taskIndex}.dateTime`);
    
        const tasks = alltask.children;
        // Re-populate local storage with updated task list
        for (let i = 0; i < tasks.length; i++){
            const taskName = tasks[i].querySelector(".task-info").textContent;
            const taskDateTime = tasks[i].querySelectorAll(".task-info")[1].textContent;
            // if (taskName && taskDateTime)  {
            localStorage.setItem(`${i + 1}.name`, taskName);
            localStorage.setItem(`${i + 1}.dateTime`, taskDateTime);
    
        }
    }
    else{ 
        console.error("Task element not found");
    }   
}
