function loadData() {
    return new Promise((res, rej) => {
        fetch(`https://api-dishes.vercel.app/`)
            .then(result => result.json())
            .then(result => res(result))
            .catch(err => rej(err))
    })
}

const cargar = () => {
    loadData("")
        .then(result => {
            if (result.state) {
                try {
                    const table = document.getElementById('tBody')
                    table.innerHTML = ''
                    result.data.forEach(dish => {
                        const row = document.createElement('tr')
                        const colId = document.createElement('td')
                        colId.appendChild(document.createTextNode(dish.idDish))
                        row.append(colId)
                        const colName = document.createElement('td')
                        colName.appendChild(document.createTextNode(dish.name))
                        row.append(colName)
                        const colCalories = document.createElement('td')
                        colCalories.appendChild(document.createTextNode(dish.calories))
                        row.append(colCalories)
                        const colVegetarian = document.createElement('td')
                        let vegetarian = dish.isVegetarian ? "Si" : "No"
                        colVegetarian.appendChild(document.createTextNode(vegetarian))
                        row.append(colVegetarian)
                        const colValue = document.createElement('td')
                        colValue.appendChild(document.createTextNode(dish.value))
                        row.append(colValue)
                        const colComments = document.createElement('td')
                        colComments.appendChild(document.createTextNode(dish.comments))
                        row.append(colComments)
                        table.append(row)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
        .catch(err => {
            console.log(err)
        })

}

try {
    cargar()
} catch (err) {
    console.log(err)
}

try {
    document.getElementById('buscar').addEventListener('click', () => {
        const id = document.getElementById('buscar').value
        if (id !== '') {
            const URI = `https://api-dishes.vercel.app/${id}`
            fetch(URI, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
                .then(result => {
                    const table = document.getElementById('tBody')
                    table.innerHTML = ''

                    const dish = result.data
                    const row = document.createElement('tr')
                    const colId = document.createElement('td')
                    colId.appendChild(document.createTextNode(dish.idDish))
                    row.append(colId)
                    const colName = document.createElement('td')
                    colName.appendChild(document.createTextNode(dish.name))
                    row.append(colName)
                    const colCalories = document.createElement('td')
                    colCalories.appendChild(document.createTextNode(dish.calories))
                    row.append(colCalories)
                    const colVegetarian = document.createElement('td')
                    let vegetarian = dish.isVegetarian ? "Si" : "No"
                    colVegetarian.appendChild(document.createTextNode(vegetarian))
                    row.append(colVegetarian)
                    const colValue = document.createElement('td')
                    colValue.appendChild(document.createTextNode(dish.value))
                    row.append(colValue)
                    const colComments = document.createElement('td')
                    colComments.appendChild(document.createTextNode(dish.comments))
                    row.append(colComments)
                    table.append(row)
                }).catch(err => console.log(err))
        } else {
            cargar()
        }
    })
} catch (err) {
    console.log(err)
}

try {
    document.getElementById('eliminar').addEventListener('click', () => {
        const id = document.getElementById('remover').value
        if (id !== '') {
            const URI = `https://api-dishes.vercel.app/${id}`
            fetch(URI,{
                method:'DELETE',
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then( result => result.json())
            .then(result => {
                if(result.state){
                    alert("Plato Eliminado")
                }else{
                    alert("Error al eliminar el plato, revisar objectId ingresado")
                }
            })
            .catch(err => console.log(err))
        }else{
            alert("Debe rellenar todos los campos")
        }
    })
} catch (err) {
    console.log(err)
}

const loadFields = () => {
    const idValue = document.getElementById('id').value
    const nameValue = document.getElementById('name').value
    const caloriesValue = document.getElementById('calories').value
    const vetarianValue = document.getElementById('vetarian').value == 1
    const valueValue = document.getElementById('value').value
    const commentsValue = document.getElementById('comments').value

    const data = { "idDish": idValue, "name": nameValue, "calories": caloriesValue, "isVegetarian": vetarianValue, "value": valueValue, "comments":commentsValue }

    return JSON.stringify(data)
}
const agregar = (URI) =>{
    return new Promise ((res, rej)=>{
        fetch(URI,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:loadFields()
        })
        .then( result => result.json())
        .then(result => res(result))
        .catch(err => console.log(err))
    })
}
try {
    document.getElementById('agregar').addEventListener('click', () => {
        if (id !== '') {
            const URI = `https://api-dishes.vercel.app/`
            agregar(URI)
                .then(result =>{
                    if (result.state) {
                        alert("El plato  se guardo con exito")
                    }else{
                        alert(`No se pudo guardar el plato`)
                    }
                })
        }else{
            alert("Debe rellenar todos los campos")
        }
    })
} catch (err) {
    console.log(err)
}