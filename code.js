//Definicion de variables
const url = 'http://localhost:3000/api/productos';

// const url = "/dic.txt";
const contenedor = document.querySelector('tbody');
let resultados = "";

const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'));
const formProducto = document.querySelector('form');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const familia = document.getElementById('familia');
let opcion = "";

btnCrear.addEventListener('click', ()=>{
    descripcion.value = "";
    precio.value = "";
    stock.value = "";
    familia.value = "";
    modalProducto.show();
    opcion = 'crear';
})

// Funcion para mostrar los resultados
const mostrar = (productos) =>{
    productos.forEach((producto) =>{
        resultados += `
                    <tr>
                        <td>${producto.id}</td> 
                        <td>${producto.descripcion}</td> 
                        <td>${producto.precio}</td> 
                        <td>${producto.stock}</td> 
                        <td>${producto.familia}</td> 
                        <td class="text-center">
                            <a class="btnEditar btn btn-primary">Editar</a>
                            <a class="btnBorar btn btn-danger">Borar</a>
                          
                        </td> 
                    </tr>
                    `
    })
    
    contenedor.innerHTML = resultados;
    
}

//Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
