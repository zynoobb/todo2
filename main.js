// 유저가 값을 입력한다
// + 버튼 클릭 시 할 일이 추가된다
// delete버튼 클릭 시 할 일이 삭제된다
// check버튼 클릭 시 할 일이 끝나며, 밑줄이 생김
// 1 check 버튼 클릭 시 true 
// true 이면 끝난 것으로 간주하고 밑줄 보여주기 // id 부여
// false 이면 안끝난 것으로 간주하고 그대로
// 진행중 끝남 탭을 누를 시 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행 중탭은 진행 중 아이템만
// 전체탭을 누르면 전체아이템으로 돌아옴

let taskinput = document.getElementById("task-input");
let addbutton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let tasklist = [];
let mode = "all";
let filterlist = [];

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs);

addbutton.addEventListener("click",addtask)
taskinput.addEventListener("focus",function(){
    taskinput.value = "";})

function addtask() {
    let task = {
        id : randomidgenerate(),
        taskcontent : taskinput.value,
        iscomplete : false
    }
    tasklist.push(task);
    render();
}

function render(){
    let list = [];
    if(mode == "all"){
        list = tasklist;
    }else if(mode == "ongoing"||mode == "done"){
        list = filterlist;
    }
    let resultHTML = '';
    for(let i=0;i<list.length;i++){
        if(list[i].iscomplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskcontent}</div>
            <div>
              <button onclick="tooglecomplete('${list[i].id}')"><i class="fa-regular fa-rotate-left"></i></i></button>
              <button onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`
        }else{
        resultHTML += `<div class="task">
             <div>${list[i].taskcontent}</div>
             <div>
              <button onclick="tooglecomplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`
    }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function tooglecomplete(id) {
    console.log("id:",id);
    for(let i=0;i<tasklist.length;i++){
        if(tasklist[i].id == id){
            tasklist[i].iscomplete = !tasklist[i].iscomplete;
            break;
        }
    }
    render();
}

function deletetask(id){
 for(let i=0;i<tasklist.length;i++){
    if(tasklist[i].id == id) {
        tasklist.splice(i, 1);
        break;
    }
 }   
 render();
}

function randomidgenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}

function filter(event){
    mode = event.target.id
    if(mode == "all"){
        render()
    } else if(mode == "ongoing"){
        for(let i=0;i<tasklist.length;i++){
            if(tasklist[i].iscomplete == false){
                filterlist.push(tasklist[i])}
            }
            filterlist = tasklist;
            render();
console.log(filterlist)
        } else if(mode == "done"){
            for(let i=0;i<tasklist.length;i++){
                if(tasklist[i].iscomplete == true){
                    filterlist.push(tasklist[i])
                }
            }
        }
    }
    