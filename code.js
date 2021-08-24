//Definicion de variables
const url = 'http://localhost:3000/api/productos/';

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
                            <a class="btnBorrar btn btn-danger">Borar</a>
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

const on = (element, event, selector, handler) => {	
    // console.log(element);
    // console.log(event);
    // console.log(selector);
    // console.log(handler);
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
 
//Procedimiento para Borrar registro
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    console.log(id);
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+id, {
            method:'DELETE'
        })
        .then(res => res.json())
        .then(() => location.reload())
        // alertify.success('Ok');
    },
    function(){
        alertify.error('Cancel');
    });
})

//Procedimiento para editar registro
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const descripcionForm = fila.children[1].innerHTML;
    const precioForm = fila.children[2].innerHTML;
    const stockForm = fila.children[3].innerHTML;
    const familiaForm = fila.children[4].innerHTML;

    descripcion.value = descripcionForm;
    precio.value = precioForm;	
    stock.value = stockForm;
    familia.value = familiaForm;
    opcion = 'editar';
    modalProducto.show();
})

//Procedimiento para crear y guardar
formProducto.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (opcion=='crear') {
        // console.log('Opcion Crear');
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value,
                familia:familia.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevoProducto = [];
            nuevoProducto.push(data);
            mostrar(nuevoProducto);
        })
    }
    if (opcion=='editar') {
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value,
                familia:familia.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
    modalProducto.hide();
})