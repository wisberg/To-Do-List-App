const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Restoring list from local storage
let data = localStorage.getItem("TODO");
let LIST, id;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE = "lineThrough";


if(data){
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
}
else{
    LIST = [];
    id = 0; 
}

function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}



//DEALING WITH INPUTS & UPDATING OUR LIST
input.addEventListener('keypress', setToDo);
function setToDo(evt){
    if (evt.keyCode == 13 && input.value !== ''){
        LIST.push({
            name: `${input.value}`, 
            id: id, 
            done: false, 
            trash: false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        addToDo(LIST[id].name, LIST[id].id, LIST[id].done, LIST[id].trash);
        input.value = '';
        console.log(LIST);
        id++;
    }
    
}

function addToDo(toDo, idFunc, done, trash){
    const DONE = done ? CHECK : UNCHECK;
    const LINE_THROUGH = done ? LINE : "";
    

    if(trash){return;}

    const text = `<li class = "item">
<i class = "fa ${DONE} complete" job = "complete" id = ${idFunc}></i>
<p class = "text ${LINE_THROUGH}">${toDo}</p>
<i class = "fa fa-trash delete" job = "delete" id = ${idFunc}></i>
</li>`
list.insertAdjacentHTML("beforeend", text);

}

function completeToDo(item){
    item.classList.toggle(CHECK);
    item.classList.toggle(UNCHECK);
    item.parentNode.querySelector(".text").classList.toggle(LINE);
    LIST[item.id].done = LIST[item.id].done ? false : true;
    localStorage.setItem("TODO", JSON.stringify(LIST));
}

function deleteToDo(item){
    item.parentNode.parentNode.removeChild(item.parentNode);
    LIST[item.id].trash = true;
    localStorage.setItem("TODO", JSON.stringify(LIST));
}

list.addEventListener("click", function(event){
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        deleteToDo(element);
    }
});

clear.addEventListener("click", clearToDo);

function clearToDo(){
LIST = [];
localStorage.clear();
location.reload();
}

let today = new Date();
date.innerText = dateBuilder(today);

function dateBuilder(d) {
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
        ];
    let days = 
        ["Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}`;
}
console.log(LIST)








