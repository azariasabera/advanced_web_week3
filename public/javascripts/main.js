let submitButton = document.getElementById("submit-data");
let tasks = document.getElementById("input-task");
let name = document.getElementById("input-name");

submitButton.addEventListener("click", function(){
    let t = tasks.value;
    let n = name.value;
    fetch('http://localhost:3000/todo', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task: t, name: n})
        /*
        Another way:
        body: '{
            "task": "' + t + '",
            "name": "' + n + '"}'
        */
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    .catch(err => console.log(err));
    });
});