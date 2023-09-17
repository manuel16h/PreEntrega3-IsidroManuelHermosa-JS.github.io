//Isidro Manuel HERMOSA

/*simulador basico e-commerce - DOM - EVENTOS - LOCAL STORAGE*/

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const carInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const totalDineroPagar = document.querySelector('.total-pagar');
const totalProductPagar = document.querySelector('#contador-productos');


//EVENTO CLICK CARRITO
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
   
    numcarr();

})

// CREA ARRAY CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 



// EVENTO AGREGAR
 
productsList.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;


        const infoProduct = {
            cantidad: 1,
            titulo: product.querySelector('h2').innerText,
            precio: product.querySelector('p').innerText,
        };

        // PARA SABER SI UN PRODUCTO EXISTE, SUMAR EN EL CARRITO
        const existe = carrito.some(product => product.titulo === infoProduct.titulo);


        if (existe) {

            const productos = carrito.map(product => {
                if (product.titulo == infoProduct.titulo) {
                    product.cantidad++;
                    return product;
                } else {
                    return product;
                }

            });

            carrito = [...productos];
        } else {
            carrito = [...carrito, infoProduct];
        }

        //INSERTAR
        inserHTML();
        guardar(); //gaurdar en Storage
    }
});

//EVENTO ELIMINAR

rowProduct.addEventListener('click', (e) =>{

if(e.target.classList.contains('icon-close')){

    const product = e.target.parentElement;
    const titulo = product.querySelector('p').innerText;

    carrito = carrito.filter(product => product.titulo !== titulo);

    guardar();

    inserHTML(); //para eliminar en carrito
    
}

});



// Para insertar los elementos al HTML
const inserHTML = ()=> {


    //PARA LIMPIAR EL CARRITO Y NO REPETIR PRODUCTOS
    rowProduct.innerHTML = "";


    //PARA SUMAR CANTIDAD DE DINERO Y PRODUCTO TOTALES
    let totalDinero = 0;
    let totalProduct = 0;


    // INSERTAR EL TEXTO EL HTML - CREAR UNA NUEVA DIV
    carrito.forEach(product => {

        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
        containerProduct.innerHTML = `
        
    <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.cantidad}</span>
        <p class="titulo-producto-carrito">${product.titulo}</p>
        <span class="precio-producto-carrito">${product.precio}</span>
        </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg> 
     `;
        // INSERTAR EN LA CALSE 
        rowProduct.append(containerProduct);

        //ACTUALIZAR VALOR de dinero y product

        totalDinero = totalDinero + parseInt(product.cantidad * product.precio.slice(1));
        totalProduct = totalProduct + product.cantidad;
    });

    // console.log(inserHTML)

    const carritoLength =totalProduct;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    totalDineroPagar.innerText = `$ ${totalDinero}`;
    totalProductPagar.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};


//PARA VER LA CANTIDAD DE PRODUCTOS
const numcarr = () =>{
    totalProductPagar.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};


//Local Storage

//Set item
const guardar = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));

};



