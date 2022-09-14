const divClientes = document.querySelector("#clientes");

function crearCard(nombre, apellido, edad, comentario) {
    return `
        <div class="card m-3 mt-5 d-flex flex-row col-3" style="width: 18rem;" data-aos="zoom-in">
            <div class="card-body mb-4">
                <h5 class="card-title fw-bold d-flex justify-content-center">Nombre: ${nombre} ${apellido}</h5>
                <p class="card-text fst-italic fw-semibold d-flex justify-content-center">Edad: ${edad}</p>
                <p class="card-text fst-italic fw-semibold d-flex justify-content-center">"${comentario}"</p>
            </div>
        </div>
        `;
}

fetch("./articulos.json")
    .then((response) => response.json())
    .then((data) => {
        data.items.articulos.forEach((el) => {
            let detalle = crearCard(el.nombre, el.apellido, el.edad, el.comentario);
            divClientes.innerHTML += detalle;
        });
    });