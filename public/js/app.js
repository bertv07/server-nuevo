function getData(){
    document.getElementById('data').innerHTML = "";

    fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('data').innerHTML = "";
        data.user.forEach(user => {
            document.getElementById('data').innerHTML +=`
                <div class="user-card" id="user-card-${user.id}">
                    <h3 class="nombre">
                        ${user.nombre}
                    </h3>
                    <span class="apellido">
                        ${user.apellido}
                    </span>
                    <span class="correo">
                        ${user.correo}
                    </span>
                    <button value="${user.id}" onclick="editData(${user.id})">
                        Editar
                    </button>    
                    <button value="${user.id}"  onclick="deleteItem(${user.id})">
                        Borrar
                    </button>
                </div>
            `
        });
    });
}
getData();

const btn = document.getElementById('boton')
const btn2 = document.getElementById('boton2')
function deleteItem(id) {
    fetch(`http://localhost:3000/user/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (response.ok) {
            alert("El usuario se ha eliminado")
            getData();
        }
    })
}

function editData(id){
    var nombre = document.getElementById('nombre') 
    var apellido = document.getElementById('apellido')
    var correo = document.getElementById('correo')


    var user = document.getElementById(`user-card${id}`)

    nombre.value =  user.getElementsByClassName('nombre')[0].innerText
    apellido.value =  user.getElementsByClassName('apellido')[0].innerText
    correo.value =  user.getElementsByClassName('correo')[0].innerText


    btn2.addEventListener('click', (e) => {
        e.preventDefault()
        saveData(id)
    })
}


function saveData(id) {
    var nombre = document.getElementById('nombre') 
    var apellido = document.getElementById('apellido')
    var correo = document.getElementById('correo')

        fetch('http://localhost:3000/user', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre.value,   
            apellido: apellido.value,   
            correo: correo.value
        })
    }).then(response => {
        if (response.ok) {
            alert('El usuario se ha actualizado')
            getData();
            nombre.value = "";
            apellido.value = "";
            correo.value = "";
        }
    })
}

function createData() {
    var nombre = document.getElementById('nombre') 
    var apellido = document.getElementById('apellido')
    var correo = document.getElementById('correo')

        fetch('http://localhost:3000/user', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,   
            apellido: apellido.value,   
            correo: correo.value
        })
    }).then(response => {
        if (response.ok) {
            alert('El usuario se ha guardado')
            getData();
            nombre.value = "";
            apellido.value = "";
            correo.value = "";
        }
    })
} 

btn.addEventListener('click', (e) => {
    e.preventDefault()
    createData()
})