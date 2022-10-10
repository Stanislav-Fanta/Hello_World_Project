document.querySelector('#sub_button').addEventListener('click', add_update_task)

function add_update_task() {
    let task = document.querySelector('#id_task').value
    let amount = document.querySelector('#id_amount').value
    let done = document.querySelector('#id_done').value
    let status = document.querySelector('#id_status').value
    alert('1')
    if (done >= amount) {
        status = 'Сделано'
    }

    let task_block = document.createElement('div')
    let task_p = document.createElement('p')
    task_block.appendChild(task_p)
    let amount_p = document.createElement('p')
    task_block.appendChild(amount_p)
    let done_p = document.createElement('p')
    task_block.appendChild(done_p)
    let status_p = document.createElement('p')

    task_p.innerText = task
    amount_p.innerText = amount
    done_p.innerText = done

    const data = {'task': task, 'amount': amount, 'done': done}
    fetch("http://127.0.0.1:8000/add_task/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (pk) {
        task_block.id = `task-${pk}`
        document.querySelector("tasks").appendChild(task_block);
    });
}

function delete_task() {
    let delete_button = document.querySelector('.delete_button')
    delete_button.addEventListener('click', function () {
        data = {'pk': delete_button.target.id}
        fetch("http://127.0.0.1:8000/delete_task_view/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    })
}