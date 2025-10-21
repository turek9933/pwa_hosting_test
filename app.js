let tasks = [];
let list = document.getElementById("list");
let counter = document.getElementById("counter");
let input = document.getElementById("input");
let btn = document.getElementById("btn");

tasks.forEach(el => {
    const newLi = document.createElement("li");
    
    const textP = document.createElement("p");
    textP.innerText = el.text;
    
    const checkbox = document.createElement("input");
    checkbox.dataset.id = el.id;
    checkbox.type = "checkbox";
    checkbox.checked = el.done;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.id = el.id;
    deleteBtn.innerText = "Delete";
    
    newLi.append(textP, checkbox, deleteBtn);
    list.append(newLi);
});
counter.innerText = tasks.length;

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    render();
}

function handleAddTask(inputText) {
    tasks.push({id: Date.now(), text: inputText, done: false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleEditTask(idToEdit, event) {
    if (event === "delete") {
        tasks = tasks.filter((task) => task.id !== parseInt(idToEdit));
    } else if (event === "check") {
        tasks = tasks.map((task) => {
            if (task.id === parseInt(idToEdit)) {
                task.done = !task.done;
            }
            return task;
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    list.innerText = "";
    tasks.forEach((task) => {
        const newLi = document.createElement("li");
    
        const textP = document.createElement("p");
        textP.innerText = task.text;
        
        const checkbox = document.createElement("input");
        checkbox.dataset.id = task.id;
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.dataset.id = task.id;
        deleteBtn.innerText = "Delete";
        
        newLi.append(textP, checkbox, deleteBtn);
        list.append(newLi);
    });

    counter.innerText = tasks.length;
}

btn.addEventListener("click", () => {
    handleAddTask(input.value);
    counter.innerText = tasks.length;
    input.value = "";
    render();
});
list.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        handleEditTask(e.target.dataset.id, "check");
        render();
    }
});
list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        handleEditTask(e.target.dataset.id, "delete");
        render();
    } 
})
