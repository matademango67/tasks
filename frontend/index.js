const API_URL = "https://tasks-production-7ccf.up.railway.app";
const Create_btn = document.querySelector('.btn-create');
let Update_btn = document.querySelector('.btn-update')
let Delete_btn = document.querySelector('.btn-delete')
let title ;
let description ;
let situation ;
let situationBool;


async function getTasks() {
  const response = await fetch(API_URL); // tu ruta GET
  const data = await response.json();  // convierte la respuesta a JSON
  return data;
}

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `hace ${diff} segundos`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
  return `hace ${Math.floor(diff / 86400)} días`;
}

async function showTasks() {
  const tasks = await getTasks();
  const list = document.getElementById("task-list");

  list.innerHTML = ""; // limpiar lista antes de mostrar

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.task_title} — ${task.task_description} — ${timeAgo(task.created_at)} — ${task.task_situation ? "✔" : "✘"}`;
    list.appendChild(li);
  });
}



showTasks();


async function create(input) {
  

   const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  const data = await res.json();
  console.log("Respuesta del backend:", data);

    Swal.fire({
  icon: "info",
  title: data.message,
  timer: 3000,
  showConfirmButton: false
}).then(() => {
  location.reload();
});
}
  
Create_btn.addEventListener('click', () =>{
     alert("you are going to create a task, you can't repeat the titles")
     
     title = prompt ("Create a title for your new task")
     description = prompt ("Create a description for your new task")
     situation = prompt ("Put true if its done, otherwise put false")

     let situationBool = situation.toLowerCase() === "true";
     let titleStr = String(title);
     let descriptionStr = String(description);

     if(!title || !description || !situation){
        console.log("there was an error")
        Swal.fire({
  icon: "warning",
  title: "You have to fill all the fields correctly",
  timer: 3000,
  showConfirmButton: false
})
        return 
     }
         
     const input = {
  task_title: titleStr,
  task_description: descriptionStr,
  task_situation: situationBool
};
    create(input)
})

async function delete_task(title){
    const response = await fetch(API_URL + '/' + title, {
        method: 'DELETE'
    });
    const data = await response.json();

    Swal.fire({
  icon: "info",
  title: data.message,
  timer: 3000,
  showConfirmButton: false
}).then(() => {
  location.reload();
});
}

Delete_btn.addEventListener('click', () =>{
   alert("You are about to delete a task")

   let title = prompt ( "Type the title of the task you want to delete")
   
   if (!title) return console.log("No title entered");
   title = title.trim().toLowerCase();

     const answer = prompt(`Type "YES" to delete the task "`);

if (answer.trim().toLowerCase() === "yes") {
  console.log("Task deleted");
} else {
  console.log("Deletion canceled");

  Swal.fire({
  icon: "info",
  title: "Deletion canceled!",
  timer: 3000,
  showConfirmButton: false
});

  return
}
  
   delete_task(title)

})


async function change_task(title,info){
    const response = await fetch(API_URL + '/' + title, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)

    });
    
    const data = await response.json();

    console.log(data);
     Swal.fire({
  icon: "info",
  title: data.message,
  timer: 3000,
  showConfirmButton: false
}).then(() => {
  location.reload();
});
}


Update_btn.addEventListener('click', () =>{
   alert("You are about to change a task , you can change the fields you want")

   let title = prompt ( "Type the title of the task you want to change")
   let new_title = prompt ( "Type the new title")
   let description = prompt ( "Type the description")
   let situation = prompt ( "Type the situation")


    if (!title) {
      Swal.fire({
  icon: "error",
  title: "No title entered",
  timer: 3000,
  showConfirmButton: false
})
    return console.log("No title entered");
   } else if(!new_title){
    Swal.fire({
  icon: "error",
  title: "No New title entered",
  timer: 3000,
  showConfirmButton: false
})
    return console.log("No New title entered")
   } else if(!description){
    Swal.fire({
  icon: "error",
  title: "There was an error with the description you typed",
  timer: 3000,
  showConfirmButton: false
})
    return console.log("There was an error with the description you typed")
   } else if(!situation){
    Swal.fire({
  icon: "error",
  title: "There was an error with the situation you typed",
  timer: 3000,
  showConfirmButton: false
})
     return console.log("There was an error with the situation you typed")
   }

   String(description)
   String(new_title)
  situationBool = situation.toLowerCase() === "true";

   const info = {
  task_title: new_title,
  task_description: description,
  task_situation: situationBool
    }

   change_task(title,info)

})