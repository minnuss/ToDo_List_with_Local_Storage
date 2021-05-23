// const listContent = document.querySelector('.list-content');
const input = document.querySelector('.input');
const listContentLi = document.querySelector('.list-ul')
const form = document.getElementById('form')
const btn = document.querySelector('.btn');


// CHECK FOR LOCAL STORAGE VALUES
const todos = JSON.parse(localStorage.getItem('todos'))
if (todos) {
    todos.forEach(todo => createToDo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // console.log(input.value)
    createToDo()
})

function createToDo(todo) {

    // ************************************************
    // LOCAL STORAGE PART
    if (todo) {
        const liEl = document.createElement('li')
        liEl.innerText = todo.text.replace('\nX', '')
        if (todo.done) {
            liEl.classList.add('spanX')

            let span = document.createElement('span');
            // span.innerHTML = ' &#10008';
            span.innerHTML = '&#120;';
            span.style.cursor = 'pointer';
            liEl.appendChild(span);

            span.addEventListener('click', () => {
                span.parentElement.remove();
                updateLocalStorage()
            })
        }
        // ADD X ON CLICK
        liEl.addEventListener('click', spanX)

        listContentLi.appendChild(liEl)
        input.value = ''

        updateLocalStorage()
    }
    // ************************************************

    // PART WITHOUT LOCAL STORAGE
    // IF CHAR TYPED IS GREATER THEN 3 AND ENTER IS PRESSED
    if (input.value.length >= 3 || input.value.length >= 3 && e.keyCode === 13) {

        const liEl = document.createElement('li')
        liEl.innerText = input.value

        const allLi = listContentLi.querySelectorAll('li');
        // CHECK TO SEE IF LIST ITEM ALREADY EXIST, IF IT DOES, DELETE LAST ONE ENTERED
        allLi.forEach(val => {
            if (val.innerText.toLowerCase().replace('\nx', '') === input.value.toLowerCase()) {
                liEl.innerText = input.value + ' - item is already in the list';
                liEl.style.color = 'lightgrey';
                setTimeout(function () {
                    liEl.remove();
                }, 3000);
            };
        });

        // ADD X ON CLICK
        liEl.addEventListener('click', spanX)

        listContentLi.appendChild(liEl)
        input.value = ''

        // UPDATE LOCAL STORAGE
        updateLocalStorage()
    };
}

function updateLocalStorage() {
    todosEl = document.querySelectorAll('li')
    // ARRAY FOR LOCAL STORAGE
    const todos = []
    // FROM EVERY TODO ELEMENT, PUSH INNERTEXT AND COMPLETED TRUE/FALSE
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            done: todoEl.classList.contains('spanX')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

// ADD X SPAN ON CLICK
function spanX() {

    // add spanX class to li element on click
    let temp = this.classList.toggle('spanX');

    // if spanX class is active (true) do ...
    if (temp) {
        let span = document.createElement('span');
        // span.innerHTML = ' &#10008';
        span.innerHTML = '&#120;';
        span.style.cursor = 'pointer';
        this.appendChild(span);

        // if span element is clicked, remove parent
        span.addEventListener('click', () => {
            span.parentElement.remove();
            // because spanX is removed, update local storage
            updateLocalStorage()
        })
    } else {
        // delete every other new span created, leave only first one
        // this.querySelectorAll('span')[0].remove();
        this.getElementsByTagName('span')[0].remove();
    }
    // because spanX is created, update local storage
    updateLocalStorage()
}