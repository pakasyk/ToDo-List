let tasks = [];


// Execute a function when the user releases a key on the keyboard
document.querySelector('input').addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    addTask();
  }
});


let addTask = () => {
   
    if (document.querySelector('input').value != ""){
        tasks.push([document.querySelector('input').value, false]);
        document.querySelector('ol').innerHTML += `<li onClick="deleteItem(this)"><input type="checkbox">${tasks[tasks.length - 1][0]}<span>edit</span></li>`;
        document.querySelector('input').value = "";
        console.log(tasks);
    } else {
        alert('Task field is empty!');
    }
    
}

let deleteItem = (element) => {
    
    tasks.splice(tasks.indexOf(element.innerText), 1 );
    element.remove();
    console.log(tasks);
}

let editItem = (element) => {

}