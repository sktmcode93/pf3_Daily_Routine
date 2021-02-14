let routineList = [];

// 리스트 제작 액션
const makeList = () => {
    po3clearList();
    sortingList();
    const drList = document.querySelector(".dr-list");
    routineList.forEach(i => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        const sSpan = document.createElement("span");
        const eSpan = document.createElement("span");
        const tSpan = document.createElement("span");
        const rSpan = document.createElement("span");
        li.classList.add("dr-list-routine");
        input.type = "checkbox";
        input.classList.add("dr-routine-check");
        sSpan.classList.add("dr-routine-start");
        eSpan.classList.add("dr-routine-end");
        tSpan.classList.add("dr-routine-connect");
        rSpan.classList.add("dr-routine-rout");
        sSpan.innerText = i.sTime;
        tSpan.innerText = "-";
        eSpan.innerText = i.eTime;
        rSpan.innerText = i.routine;
        li.appendChild(input);
        li.appendChild(sSpan);
        li.appendChild(tSpan);
        li.appendChild(eSpan);
        li.appendChild(rSpan);
        drList.appendChild(li);
    })
}
const po3clearList = () => {
    const drList = document.querySelector(".dr-list");
    let children = drList.childNodes;
    while(children.length !== 0){
        drList.removeChild(children[0]);
    }
}

// add 액션
const addInputHandler = () => {
    const sTime = document.querySelector(".dr-add-start input");
    const eTime = document.querySelector(".dr-add-end input");
    const routine = document.querySelector(".dr-add-routine");
    if(!checkAddInput(sTime.value, eTime.value, routine.value)) return;
    const data = {"sTime" : sTime.value, "eTime" : eTime.value, "routine" : routine.value, "sValue" :parseInt(sTime.value.replace(":","")), "eValue" : parseInt(eTime.value.replace(":",""))};
    routineList = [...routineList, data]; 
    makeList();
    sTime.value = "";
    eTime.value = "";
    routine.value = "";
}

const checkAddInput = (sTime, eTime, routine) => {
    if(sTime === "" || eTime === "" || routine.trim() === ""){
        alert("빈 칸을 채워주세요.")
        return false;
    }
    if((parseInt(eTime.replace(":","")) - parseInt(sTime.replace(":",""))) <= 0){
        alert("시간 설정이 잘못되었습니다.")
        return false;
    }
    return true;
}


// keyDownEvent
window.addEventListener("keydown", (e) => {
    if(e.keyCode === 27){
        const check = document.querySelector(".dr-add-box").classList.contains("dr-active");
        if(check) clearAddBox();
    }
    if(e.keyCode === 13){
        const check = document.querySelector(".dr-add-box").classList.contains("dr-active");
        if(check) addInputHandler();
    }
})

// add-box Apperance
const po3addClickHandler = () => {
    if(document.querySelector(".dr-del-box").style.display === "block") cancelDeletion();
    const addBox = document.querySelector(".dr-add-box");
    setTimeout(()=>{
        setTimeout(()=>{
            addBox.classList.add("dr-active");
        },250);
        addBox.style.display="block";
    }, 250);
}

const clearAddBox = () => {
    const addBox = document.querySelector(".dr-add-box");
    setTimeout(()=>{
        setTimeout(()=>{
            addBox.style.display="none";
        },250);
        addBox.classList.remove("dr-active");
    }, 250);
}

// 일정 시간순 정렬
const sortingList = () => {
    routineList.sort(function(a,b){
        if(a.sValue === b.sValue) return a.eValue - b.eValue;
        else return a.sValue - b.sValue;
    });
}

//삭제 액션
const delListHandler = () => {
    if(routineList.length === 0){
        alert("삭제할 일정이 없습니다.");
        return;
    }
    document.querySelectorAll(".dr-routine-check").forEach(i=>{
        i.checked = false;
        i.style.display = "block";
    });
    document.querySelector(".dr-del-box").style.display = "block";
}
const confirmDeletion = () => {
    let filterList = [];
    const targetList = document.querySelectorAll(".dr-list-routine");
    targetList.forEach(i => {
        if(i.children[0].checked === false){
            const data = {"sTime" : i.children[1].innerText, "eTime" : i.children[3].innerText, "routine" : i.children[4].innerText, "sValue" :parseInt(i.children[1].innerText.replace(":","")), "eValue" : parseInt(i.children[3].innerText.replace(":",""))};
            filterList = [...filterList, data];
        }
    })
    if(filterList.length === routineList.length) return;
    if(confirm(`${routineList.length - filterList.length}개의 일정을 삭제하시겠습니까?`)){
        routineList = filterList;
        alert("삭제 되었습니다.");
        makeList();
    }
}
const cancelDeletion = () => {
    document.querySelector(".dr-del-box").style.display = "none"
    document.querySelectorAll(".dr-routine-check").forEach(i=>{
        i.style.display = "none";
    })
}