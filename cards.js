const divArticulos = document.querySelector("#cardArticulos");



function crearCard(imagen, producto, cantidad, precio) {
    return (
        `
        <div class="card m-3 col-3" style="width: 18rem;" data-aos="zoom-in">
                <img src="../img/${imagen}" class="card-img-top img-fluid mt-2" alt="cargando-imagen">
            <div class="card-body mb-4">
                <h5 class="card-title fw-bold d-flex justify-content-center">${producto}</h5>
                <p class="card-text fst-italic fw-semibold d-flex justify-content-center">${cantidad}</p>
                <p class="card-text fst-italic fw-semibold d-flex justify-content-center">${precio}</p>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <button class="btnMenos btn btn-secondary" data-producto="${producto}">-</button>
                <div class="qty mx-2 border border-4 px-2 py-1" data-producto="${producto}">0</div>
                <button class="btnMas btn btn-secondary" data-producto="${producto}">+</button>
            </div>
        </div>
        `
    )
}

fetch("./articulos.json")
    .then((response) => response.json())
    .then((data) => {
        data.items.articulos.forEach(el => {
            let detalle = crearCard(el.imagen, el.producto, el.cantidad, el.precio);
            divArticulos.innerHTML += detalle
        })
        const btnMenos = document.querySelectorAll(".btnMenos");
        const btnMas = document.querySelectorAll(".btnMas");
        
        btnMenos.forEach(element => element.addEventListener("click", function () {
            disminuirCant(this)
        }));
        btnMas.forEach(element => element.addEventListener("click", function () {
            aumentarCant(this)
        }));
        console.log(btnMenos)
    })
