/* Fetching data from data.json file */
async function fetchData() {
    try {

        const response = await fetch('../../data.json');
        if (response.ok !== false) {

            const data = await response.json();
        
            for (let i in data) {
                createProduct(data, i);
            }
        }

        document.querySelectorAll('.add-to-cart').forEach(el => {

            el.addEventListener('click', () => {

                updateCartElementsNumber();
                hideEmptyCartElements();
                createControlQuantityButton(el);
                createProductCart();
            
            });

        });

    } catch (error) {
        console.error(error);
    }
}
fetchData();

/* Selecting products container */
const productsArea = document.querySelector('.products');

/* Function that creates the product */
function createProduct(data, x) {

    let product = document.createElement('div');
    product.className = 'product';

    let imageContainer = document.createElement('div');
    imageContainer.className = 'image';

    let image = document.createElement('img');
    image.src = data[x].image.desktop;
    image.alt = 'product image';
    image.className = 'product-image';
    imageContainer.appendChild(image);

    let addToCartButton = document.createElement('div');
    addToCartButton.className = 'add-to-cart';

    let addToCartImage = document.createElement('img');
    addToCartImage.src = '../../assets/images/icon-add-to-cart.svg';
    addToCartImage.alt = 'add to cart icon';
    addToCartButton.appendChild(addToCartImage);

    let addToCartText = document.createElement('p');
    addToCartText.innerText = 'Add To Cart';
    addToCartButton.appendChild(addToCartText);

    imageContainer.appendChild(addToCartButton);

    product.appendChild(imageContainer);

    let description = document.createElement('div');
    description.className = 'description';

    let category = document.createElement('p');
    category.className = 'product-category';
    category.innerText = data[x].category;

    let name = document.createElement('p');
    name.className = 'product-name';
    name.innerText = data[x].name;

    let price = document.createElement('p');
    price.className = 'product-price';
    price.innerText = `$ ${data[x].price}`;

    description.appendChild(category);
    description.appendChild(name);
    description.appendChild(price);

    product.appendChild(description);

    productsArea.appendChild(product);
    
}

/* Control quantity dynamically */
let quantitySpan = document.querySelector('.quantity');
let totalQuantity = 0;
quantitySpan.innerText = totalQuantity;

function hideEmptyCartElements() {
    document.querySelector('.empty-cart-image').classList.add('hidden');
    document.querySelector('.empty-cart-message').classList.add('hidden');

    document.querySelector('div.carbon-neutral-delivery').classList.remove('hidden');
        document.querySelector('.confirm-order').classList.remove('hidden');
}

function updateCartElementsNumber() {
    totalQuantity++;
    quantitySpan.innerText = totalQuantity;
}

function checkNumberZero() {
    if (totalQuantity === 0) {

        document.querySelector('.empty-cart-image').classList.remove('hidden');
        document.querySelector('.empty-cart-message').classList.remove('hidden');

        document.querySelector('div.carbon-neutral-delivery').classList.add('hidden');
        document.querySelector('.confirm-order').classList.add('hidden');

    }
}

checkNumberZero();

function createControlQuantityButton(e) {

    let quantityControlButton = document.createElement('div');
    quantityControlButton.className = 'control-quantity';

    let decreaseButton = document.createElement('img');
    decreaseButton.src = '../../assets/images/icon-decrement-quantity.svg'; 

    let quantityIndicator = document.createElement('span');
    quantityIndicator.className = 'quantity-indicator';
    let quantity = 1;
    quantityIndicator.innerText = quantity;

    let increaseButton = document.createElement('img');
    increaseButton.src = '../../assets/images/icon-increment-quantity.svg'; 

    quantityControlButton.appendChild(decreaseButton);
    quantityControlButton.appendChild(quantityIndicator);
    quantityControlButton.appendChild(increaseButton);

    e.parentNode.appendChild(quantityControlButton);

    increaseButton.addEventListener('click', () => {

        quantity++;
        quantityIndicator.innerText = quantity;

        updateCartElementsNumber();
        hideEmptyCartElements();

    });

    decreaseButton.addEventListener('click', () => {

        quantity--;
        quantityIndicator.innerText = quantity;
        if (quantity === 0) {
            decreaseButton.parentNode.remove();
        }

        totalQuantity--;
        quantitySpan.innerText = totalQuantity;
        checkNumberZero();

    });
}

function createProductCart() {

    let cartOrders = document.querySelector('div.order-list .cart-orders');

    cartOrders.innerHTML += `

        <div class="order">
            <div class="order-info">
              <p class="cart-order-name"></p>
              <div class="quantities-and-price">
                <p class="cart-quantity"><span class="cart-quantity"></span></p>
                <p class="cart-unit-price"><span class="cart-unit-price"></span></p>
                <p class="cart-total-price"><span class="cart-total-price"></span></p>
              </div>
            </div>
            
            <img src="./assets/images/icon-remove-item.svg" alt="remove item icon" class="remove-order">
          </div>

    `;

    document.querySelectorAll('img.remove-order').forEach(i => {
        i.addEventListener('click', () => {
            i.parentNode.remove();
        });
    });


}