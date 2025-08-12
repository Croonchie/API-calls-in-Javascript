// DOM references
const output = document.getElementById("output");
const fetchBtn = document.getElementById("fetchBtn");
const xhrBtn = document.getElementById("xhrBtn");
const postForm = document.getElementById("postForm");
const putForm = document.getElementById("putForm");

// Helper: Display message
function displayMessage(msg, isError = false) {
    output.innerHTML = `<p style="color:${isError ? 'red' : 'green'}">${msg}</p>`;
}

// Task 1: GET with fetch()
fetchBtn.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        })
        .catch(err => displayMessage(`Fetch error: ${err.message}`, true));
});

// Task 2: GET with XMLHttpRequest
xhrBtn.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        } else {
            displayMessage(`XHR error: ${xhr.status}`, true);
        }
    };
    xhr.onerror = function() {
        displayMessage("Network error with XHR", true);
    };
    xhr.send();
});

// Task 3: POST with fetch()
postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value.trim();
    const body = document.getElementById("postBody").value.trim();

    if (!title || !body) {
        displayMessage("Title and body cannot be empty.", true);
        return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return res.json();
        })
        .then(data => {
            displayMessage(`Post created! ID: ${data.id}`);
        })
        .catch(err => displayMessage(`POST error: ${err.message}`, true));
});

// Task 4: PUT with XMLHttpRequest
putForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("putId").value.trim();
    const title = document.getElementById("putTitle").value.trim();
    const body = document.getElementById("putBody").value.trim();

    if (!id || !title || !body) {
        displayMessage("ID, title, and body are required.", true);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>Updated: ${data.title}</h3><p>${data.body}</p>`;
        } else {
            displayMessage(`PUT error: ${xhr.status}`, true);
        }
    };

    xhr.onerror = function() {
        displayMessage("Network error during PUT", true);
    };

    xhr.send(JSON.stringify({ id, title, body }));
});

