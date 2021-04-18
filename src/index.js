// document.addEventListener('DOMContentLoaded', () => {

// })

const initial_URL = 'http://localhost:3000/dogs'

function getDogs() {
    return fetch(`${initial_URL}`)
    .then(resp => resp.json())
}

function createTableInfo(dogData) {
    const table = document.getElementById('table-body'),
    row = document.createElement('tr'),
    name = document.createElement('td'),
    breed = document.createElement('td'),
    sex = document.createElement('td'),
    buttonTD = document.createElement('td'),
    button = document.createElement('button');

    name.textContent = dogData.name;
    breed.textContent = dogData.breed;
    sex.textContent = dogData.sex;
    button.textContent = "edit";

    row.appendChild(name);
    row.appendChild(breed);
    row.appendChild(sex);
    buttonTD.appendChild(button);
    row.appendChild(buttonTD)
    table.appendChild(row)

    return table;
}

function showDogsOnTable() {
    getDogs().then(dogs => dogs.forEach(dog => {
        const dogRow = createTableInfo(dog)
        editClick(dogRow)
        return dogRow;
    }))
}

getDogs().then(showDogsOnTable())

function editClick(dogRow) {
    const button = dogRow.getElementsByTagName('button')
    button.addEventListener('click', editValues )
}

function editValues(dog) {
    const name = document.getElementById('name'),
    breed = document.getElementById('breed'),
    sex = document.getElementById('sex'),
    submit = document.getElementsByClassName('submit');

    name.value = dog.name;
    breed.value = dog.breed;
    sex.value = dog.sex;
    submit.id = dog.id
}

function submitclick() {
    const submit = document.getElementsByClassName('submit')
    submit.addEventListener('click', submitValues)
    }

function submitValues(e) {
    const table = document.getElementById('table-body')
    e.preventDefault()
    editDog(submit.id)
    table.innerHTML = ''
    showDogsOnTable()
}

function editDog(id) {
    const name = document.getElementById('name');
    const breed = document.getElementById('breed');
    const sex = document.getElementById('sex');
    const configObj = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            breed: breed.value,
            sex: sex.value
        })
    }
    fetch(`${initial_URL}${id}`, configObj)
        .then(resp => resp.json())
}

submitclick();