const btnMenos = document.querySelectorAll(".btnMenos");
const btnMas = document.querySelectorAll(".btnMas");
const qtyBoxArr = document.querySelectorAll(".qty");
const btnPreview = document.querySelector("#btnPreview");
const btnOnlyCarrito = document.querySelectorAll(".onlyIfCarrito");
const modalBuy = document.querySelector("#modalBuy");
const wsappNum = "541151113625";

let nombreCliente = JSON.parse(localStorage.getItem("nombreCte")) == null ? preguntarNombre() : JSON.parse(localStorage.getItem("nombreCte"));

// function preguntarNombre() {
//     let nombre = prompt("Ingrese su nombre");
//     localStorage.setItem("nombreCte", JSON.stringify(nombre));
//     return nombre;
// };

// alert("Bienvenido de nuevo " + nombreCliente + "!");

let qtyBox;

function aumentarCant(ev) {
    let producto = ev.dataset.producto;
    qtyBoxArr.forEach(function (el) {
        if (el.dataset.producto == producto) {
            qtyBox = el
        }
    })
    let cantidad = parseInt(qtyBox.innerHTML);
    cantidad++;
    qtyBox.innerHTML = cantidad;
    console.log("Se añadio un producto " + producto);
};

function disminuirCant(ev) {
    let producto = ev.dataset.producto;
    qtyBoxArr.forEach(function (el) {
        if (el.dataset.producto == producto) {
            qtyBox = el
        }
    })
    let cantidad = parseInt(qtyBox.innerHTML);
    cantidad == 0 ? cantidad = 0 : cantidad--;
    qtyBox.innerHTML = cantidad;
    console.log("Se quitó un producto " + producto);
};

function showCarrito() {
    modalBuy.classList.remove("bg-success");
    let qtyArray = Array.from(qtyBoxArr);
    if (qtyArray.some(function (el) {
            return parseInt(el.innerHTML) > 0;
        })) {
        btnOnlyCarrito.forEach(el => el.style.display = "inline");
        let msg = "Vas a comprar:<br>";
        qtyBoxArr.forEach(function (el) {
            if (el.innerHTML > 0) {
                msg += el.innerHTML + " Combo N° " + el.dataset.producto + "<br>"
            }
        });
        modalBuy.innerHTML = msg;
    } else {
        btnOnlyCarrito.forEach(el => el.style.display = "none");
        modalBuy.innerHTML = "No hay productos en el carrito, añade algo para comprar!";
    };
};

function emptyCart() {
    btnOnlyCarrito.forEach(el => el.style.display = "none");
    modalBuy.innerHTML = "No hay productos en el carrito, añade algo para comprar!";
    qtyBoxArr.forEach(el => el.innerHTML = 0);
};

function buyCart() {
    let texto = "Hola,%20quiero%20relizar%20un%20pedido%20de:%0A";
    qtyBoxArr.forEach(function (el) {
        if (el.innerHTML > 0) {
            texto += `${el.innerHTML}%20X%20${el.dataset.producto}%0A`
        }
    });
    let wsappLink = `https://wa.me/${wsappNum}?text=${texto}`;
    window.open(wsappLink, "_blank");
    btnOnlyCarrito.forEach(el => el.style.display = "none");
    modalBuy.classList.add("bg-success")
    modalBuy.innerHTML = "Gracias por realizar la compra!";
    qtyBoxArr.forEach(el => el.innerHTML = 0);
}

//Event listeners
btnMenos.forEach(element => element.addEventListener("click", function () {
    disminuirCant(this)
}));
btnMas.forEach(element => element.addEventListener("click", function () {
    aumentarCant(this)
}));
btnPreview.addEventListener("click", showCarrito);
btnOnlyCarrito.forEach(function (el) {
    if (el.dataset.btntype == "emptyCart") {
        el.addEventListener("click", emptyCart)
    }
});
btnOnlyCarrito.forEach(function (el) {
    if (el.dataset.btntype == "buyCart") {
        el.addEventListener("click", buyCart)
    }
});

btnMas.forEach(el => console.log(el.dataset.producto))

console.log(qtyBoxArr)