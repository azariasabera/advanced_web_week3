let submitButton = document.getElementById("submit-data");
let tasks = document.getElementById("input-task");
let name = document.getElementById("input-name");
let searchName = document.getElementById("search-name");
let searchButton = document.getElementById("search");
let searchResults = document.getElementById("search-results");
searchResults.style.display = "none";
let deleteUserButton = document.getElementById("delete-user");

submitButton.addEventListener("click", function(){
    let t = tasks.value;
    let n = name.value;
    fetch("/todo", {
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
    .then(response => response.text()) 
    // From server side I was sending a string like "User added" and it was raising an error.
    // The reason was that I was trying to parse a string to JSON object.
    // ie it was .then(response => response.json()) and it was raising an error.
    .then(data => {
        console.log(data);
        document.getElementById("response-message").innerText = data;
    });
});

searchButton.addEventListener("click", function(){
    let n = searchName.value;
    searchResults.style.display = "block";
    fetch("/user/" + n)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error("User not found");
        }    
    })
    .then(user => {
        document.getElementById('search-results-message').textContent = `${user.name}: ${user.task.join(', ')}`;
        const resultDiv = document.getElementById('search-result');
        //resultDiv.innerHTML = `${user.name}:`;
        const parag = document.createElement('p');
        parag.textContent = "Want to delete task?";
        resultDiv.appendChild(parag);

        user.task.forEach(todo => {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = `${todo}`;
            deleteButton.classList.add('delete-task');
            deleteButton.addEventListener('click', () => {
                fetch('/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name : n, task: todo})
                })
                .then(response => response.text())
                .then(message => {
                    document.getElementById('response-message').textContent = message;
                    if (message === 'Task deleted') {
                        deleteButton.remove();
                        // clear resultDiv
                        resultDiv.innerHTML = '';
                    }
                });
            });
            
            resultDiv.appendChild(deleteButton);
        });
    })
    .catch(error => {
        document.getElementById('search-results-message').textContent = error.message;
    });
});


deleteUserButton.addEventListener("click", function(){
    //console.log("Delete user button clicked");
    let n = searchName.value;
    fetch("/user/" + n, {
        method: "delete"
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error("User not found");
        }
    })
    .then(data => {
        document.getElementById('delete-user-message').textContent = data.msg;
    })
    .catch(error => {
        document.getElementById('delete-user-message').textContent = error.message;
    });
});


