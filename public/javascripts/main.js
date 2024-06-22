let submitButton = document.getElementById("submit-data");
let tasks = document.getElementById("input-task");
let name = document.getElementById("input-name");
let searchName = document.getElementById("search-name");
let searchButton = document.getElementById("search");
let searchResults = document.getElementById("search-results");

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
    });
});

searchButton.addEventListener("click", function(){
    let n = searchName.value;
    fetch("/todo/" + n)
    .then(response => response.text())
    .then(html => {
        searchResults.innerHTML = html;
        searchResults.style.display = "block";
    })
    .catch(error => {
        console.log(error);
    });
});

