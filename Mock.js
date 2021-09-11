const addServer = document.getElementById("addServer");
const addTask = document.getElementById("addTask");
const inputvalue = document.getElementById("inputvalue");
const removeServerButton = document.getElementById("remove");
const serverList = document.getElementById("serverlist");
let counterServer = 1;
let serverArrayList = [1];
let counterTask = 0;
let serverTaskMap = new Map();
let serverDeleted = 0;


addServer.addEventListener("click", () => {
    addNewServer();
})

const addNewServer = () => {
    counterServer++;
    serverArrayList = [...serverArrayList, counterServer];
    const server = document.createElement('div');
    server.classList.add('serverlist');
    server.id = (counterServer)
    document.getElementById("server").appendChild(server);
    // console.log(serverArrayList);
}

addTask.addEventListener('click', () => {
    let data = inputvalue.value
    addTaskToServer(data, true);
})

// addTaskToServer will call by addTask BUtton and and taksTimer (after 1 secevery)
const addTaskToServer = (tasktoadded, isAdd) => {
    if (isAdd === true) {
        counterTask += tasktoadded;
    }
    // console.log(counterTask + " task to be loaded");
    serverArrayList.map((server) => {
        if (counterTask > 0) {
            if (serverTaskMap.has(server)) {
                console.log(server + "has already a task " + serverTaskMap.get(server));
            }
            else {
                // console.log("inside else");
                const avilableServer = document.getElementById(server);
                const pBar = document.createElement('div');
                pBar.classList.add('pb_container');
                const pBarHtml = `
                                <div class="progress-bar" id= "play-animation">
                                </div>`
                pBar.insertAdjacentHTML('afterbegin', pBarHtml);
                avilableServer.appendChild(pBar);
                serverTaskMap.set(server, 1);
                timeOut(server, pBar);
                counterTask--;
                document.getElementById("tp").textContent = "Task pending " + counterTask;
                pendingTask(counterTask);
            }

        }
    })
}
const pendingTask = (pendingTaskCount) => {
    let parent = document.getElementById("action_list");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < pendingTaskCount; i++) {
        const pBar = document.createElement('div');
        pBar.classList.add('waitingTask');
        pBar.id = ("a" + i);
        const pBarHtml = `
        <div class="pb_container">
            <span style="padding-left:5px">Waiting...</span>
        </div>`
        pBar.insertAdjacentHTML('afterbegin', pBarHtml);
        document.getElementById("action_list").appendChild(pBar);
        pBar.addEventListener('click', () => {
            removePendingTask(pBar.id);
        })
    }
}
const removePendingTask = (i) => {
    document.getElementById(i).remove();
    counterTask--;
    document.getElementById("tp").textContent = "Task pending: " + counterTask;
}


removeServerButton.addEventListener('click', () => {
    // console.log("inside remove");
    removeserver(1, true);
})

const removeserver = (taskDeleted, isNew) => {
    if (isNew === true) {
        serverDeleted += taskDeleted;
    }
    // console.log(serverDeleted + " server to be deleted current Server count " + counterServer);
    if (serverDeleted > 0 && counterServer > 0) {
        if (serverTaskMap.has(counterServer)) {
            console.log("Cannnot delete Server as task is already in progress");
            document.getElementById("sd").innerHTML = "Server to be removed:"+serverDeleted;
        }
        else {
            let updatedServer = serverArrayList.pop();
            document.getElementById(updatedServer).remove();
            counterServer--;
            serverDeleted--;
            document.getElementById("sd").innerHTML = "Server to be removed:"+serverDeleted;
        }
    }
}


const timeOut = (server, pBar) => {
    setTimeout(() => {
        document.getElementById(server).removeChild(pBar);
        serverTaskMap.delete(server);
    }, 5000)
}

const taskTimer = setInterval(() => {
    addTaskToServer(counterTask, false);
}, 1000);

const d = setInterval(() => {
    removeserver(serverDeleted, false);
}, 1000);
