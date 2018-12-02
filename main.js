let tasks = [];
let edit = false;


document.querySelector('h6').innerText = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;


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
          <div class="checkContainer">
            <input type="checkbox">
            <span class="checkmark"></span>
          </div>         
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
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    
      
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