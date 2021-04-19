 document.addEventListener('DOMContentLoaded', () => {
    getDogs()
        .then(showDogsOnTable())
        .then(submitclick())
 })

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

    button.addEventListener('click', function() {
    const form = document.getElementById('dog-form');
    let currentDog = {};

    form.name.value = dogData.name;
    form.breed.value = dogData.breed;
    form.sex.value = dogData.sex;
    currentDog = dogData
    }
    )
}

function showDogsOnTable() {
    getDogs().then(dogs => dogs.forEach(dog => {
        const dogRow = createTableInfo(dog)
        return dogRow;
    }
    ))
}



// function editClick(dogRow) {
//     const button = dogRow.getElementsByName('edit')
//     button.addEventListener('click', editValues() )
// }

// function editValues(dog) {
//     const form = document.getElementById('dog-form'),
//     currentDog = {};

//     form.name.value = dog.name;
//     form.breed.value = dog.breed;
//     form.sex.value = dog.sex;
//     currentDog = dog
// }

function submitclick() {
    const form = document.getElementById('dog-form')
    form.addEventListener('click', function(e) {
        
        e.preventDefault()
        editDog(submit.id)
        table.innerHTML = ''
    })
    }

// function submitValues(e) {
//     const table = document.getElementById('dog-form')
//     e.preventDefault()
//     editDog(submit.id)
//     table.innerHTML = ''
// }

function editDog(id) {
    const name = document.getElementsByName('name');
    const breed = document.getElementsByName('breed');
    const sex = document.getElementsByName('sex');
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

