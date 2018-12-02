let tasks = [];
let edit = false;
let d = new Date();


document.querySelector('h6').innerText = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;


// Execute a function when the user releases a key on the keyboard
document.querySelector('.addField').addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13 && edit == false) {
    // Trigger the button element with a click
    addTask();
  } 
});



let addTask = () => {
   
    if (document.querySelector('.addField').value != ""){
        tasks.push([document.querySelector('.addField').value, false]);
        document.querySelector('ul').innerHTML += `
        <li>
          
          <label class="checkContainer">
            <input type="checkbox">
            <span class="checkmark" onClick="checkItem(this)"></span>
          </label>         
          <span class="taskText" onClick="editItem(this)">${tasks[tasks.length - 1][0]}</span>
          <input class="editField" type="text" value="" style="display: none;">
          <span class="taskRemove" onClick="deleteItem(this)"></span>
        </li>`;
        document.querySelector('input').value = "";
        console.log(tasks);
    } else {
        alert('Task field is empty!');
    }
    
}

let deleteItem = (element) => {
    for (let i = 0; i < tasks.length; i++){
      if (tasks[i][0] == element.parentNode.querySelector(".taskText").innerText){
        tasks.splice(i,1);
        break;
      }
    }
    element.parentNode.remove();
    console.log(tasks);
    document.querySelector('.addField').focus();
}

let editItem = (element) => {

  element.parentNode.querySelector('.editField').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 && edit == true){
      editFunction(element);
      edit = false;
    }
  });
  element.parentNode.querySelector('.editField').style.display = "block";
  element.parentNode.querySelector('.editField').value = element.parentNode.querySelector(".taskText").innerText;
  element.parentNode.querySelector(".taskText").style.display = "none";
  element.parentNode.querySelector('.editField').focus();
  edit = true;
  console.log(element.parentNode.querySelector('.editField').value);

}

let editFunction = (element) => {
  
  for (let i = 0; i < tasks.length; i++){
    if (tasks[i][0] == element.parentNode.querySelector(".taskText").innerText){
      tasks[i][0] = element.parentNode.querySelector('.editField').value;
      break;
    }
  }

  console.log(tasks);
  element.parentNode.querySelector(".taskText").innerText = element.parentNode.querySelector('.editField').value;

  element.parentNode.querySelector(".taskText").style.display = "block";
  element.parentNode.querySelector(".editField").style.display = "none";
  document.querySelector('.addField').focus();
}  

let checkItem = (element) => {
  
  if(element.parentNode.querySelector('input[type=checkbox]').hasAttribute("checked")){
    element.parentNode.querySelector('input[type=checkbox]').removeAttribute("checked");
    for (let i = 0; i < tasks.length; i++){
      if (tasks[i][0] == element.parentNode.parentNode.querySelector(".taskText").innerText){
        tasks[i][1] = false;
        
        break;
      }
    }
    
  } else {
    
    element.parentNode.querySelector('input[type=checkbox]').setAttribute("checked", "");

    for (let i = 0; i < tasks.length; i++){
      if (tasks[i][0] == element.parentNode.parentNode.querySelector(".taskText").innerText){
        tasks[i][1] = true;
        
        break;
      }
    }
  }
  document.querySelector('.addField').focus();
}

let myFilter = (element) => {
  let checked = "";
  document.querySelector('ul').innerHTML = "";

  if (element == 'pending'){

    for (let i = 0; i < tasks.length; i++){
      if (tasks[i][1] == false) {
        document.querySelector('ul').innerHTML += `
        <li>
          <label class="checkContainer">
            <input type="checkbox">
            <span class="checkmark" onClick="checkItem(this)"></span>
          </label>         
          <span class="taskText" onClick="editItem(this)">${tasks[i][0]}</span>
          <input class="editField" type="text" value="" style="display: none;">
          <span class="taskRemove" onClick="deleteItem(this)"></span>
        </li>`;      
      }
    }
  } else if (element == 'done'){
      for (let i = 0; i < tasks.length; i++){
        if (tasks[i][1] == true) {
          document.querySelector('ul').innerHTML += `
          <li>
            <label class="checkContainer">
              <input type="checkbox" checked>
              <span class="checkmark" onClick="checkItem(this)"></span>
            </label>         
            <span class="taskText" onClick="editItem(this)">${tasks[i][0]}</span>
            <input class="editField" type="text" value="" style="display: none;">
            <span class="taskRemove" onClick="deleteItem(this)"></span>
          </li>`;      
        }
      }

  } else {
    for (let i = 0; i < tasks.length; i++){
      checked = "";
      if (tasks[i][1] == true) {
        checked = "checked";
      }
        document.querySelector('ul').innerHTML += `
        <li>
          <label class="checkContainer">
            <input type="checkbox" ${checked}>
            <span class="checkmark" onClick="checkItem(this)"></span>
          </label>         
          <span class="taskText" onClick="editItem(this)">${tasks[i][0]}</span>
          <input class="editField" type="text" value="" style="display: none;">
          <span class="taskRemove" onClick="deleteItem(this)"></span>
        </li>`;      
      
    }
  }

}