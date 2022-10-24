document.querySelector('#sub_button').addEventListener('click', add_task)
document.querySelector('#sub_update_button').addEventListener('click', update_task)

function add_task() {
    let task = document.querySelector('#id_task').value
    let amount = document.querySelector('#id_amount').value
    let done = document.querySelector('#id_done').value
    let status = document.querySelector('#id_status').value


    let task_block = document.createElement('div')

    let task_p = document.createElement('p')
    task_p.id = 'task_task'
    task_block.appendChild(task_p)

    let amount_p = document.createElement('p')
    amount_p.id = 'task_amount'
    task_block.appendChild(amount_p)

    let done_p = document.createElement('p')
    done_p.id = 'task_done'
    task_block.appendChild(done_p)

    let status_p = document.createElement('p')
    status_p.id = 'task_status'
    task_block.appendChild(status_p)

    let update_button = document.createElement('button')
    update_button.classList.add('update_button')
    click_update(update_button)
    task_block.appendChild(update_button)
    update_button.innerText = 'Обновить'

    let delete_button = document.createElement('button')
    delete_button.classList.add('delete_button')
    click_delete(delete_button)
    task_block.appendChild(delete_button)
    delete_button.innerText = 'Удалить'


    task_p.innerText = task
    amount_p.innerText = amount
    done_p.innerText = done
    status_p.innerText = status

    const data = {'task': task, 'amount': amount, 'done': done, 'status': status}
    fetch("http://127.0.0.1:8000/add_task/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (pk) {
        task_block.id = `task-${pk}`
        delete_button.id = pk
        update_button.id = pk
        document.querySelector(".tasks").appendChild(task_block);
    });
}



function click_delete(delete_button) {
    delete_button.addEventListener("click", function () {
        fetch("http://127.0.0.1:8000/delete_task/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"pk": delete_button.id})
        })
        let task_div = document.querySelector(`#task-${delete_button.id}`)
        console.log(task_div)
        task_div.remove()
    })
}


function click_update(update_button) {
    update_button.addEventListener('click', function () {
        let sub_update_button = document.querySelector('#sub_update_button')
        sub_update_button.classList.remove('hidden')

        let task_div = document.querySelector(`#task-${update_button.id}`)
        let task = document.querySelector(`#task-${update_button.id} #task_task`).innerText
        let task_input = document.querySelector('#id_task')
        task_input.value = task

        let amount = task_div.querySelector(`#task-${update_button.id} #task_amount`).innerText
        let amount_input = document.querySelector('#id_amount')
        amount_input.value = amount

        let done = document.querySelector(`#task-${update_button.id} #task_done`).innerText
        let done_input = document.querySelector('#id_done')
        done_input.value = done

        let status = document.querySelector(`#task-${update_button.id} #task_status`).innerText
        console.log(status)
        let status_input = document.querySelector('#id_status')
        status_input.value = status

        let id = update_button.id
        let id_input = document.querySelector('#id_input')
        id_input.value = id
    })
}

function update_task() {
    let task = document.querySelector('#id_task').value
    let amount = document.querySelector('#id_amount').value
    let done = document.querySelector('#id_done').value
    let status = document.querySelector('#id_status').value
    console.log(status)
    let id = document.querySelector('#id_input').value

    let task_div = document.querySelector(`#task-${id}`)
    let task_p = task_div.querySelector('#task_task')
    let amount_p = task_div.querySelector('#task_amount')
    let done_p = task_div.querySelector('#task_done')
    let status_p = task_div.querySelector('#task_status')

    task_p.innerText = task
    amount_p.innerText = amount
    done_p.innerText = done
    status_p.value = status

    const data = {'task': task, 'amount': amount, 'done': done, 'status': status, 'pk': id}
    fetch("http://127.0.0.1:8000/update_task/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
    })
}

document.querySelectorAll('.update_button').forEach(click_update)
document.querySelectorAll('.delete_button').forEach(click_delete)