async function fetchData() {
    try {

        const response = await fetch('../../data.json');
        console.log(response);
        if (response.ok !== false) {

            const data = await response.json();

            console.log(data);
            console.log(data[0]);
            console.log(data[0].image);
            console.log(data[0].image.desktop);
            console.log(typeof data[0].image.desktop);

            for (let i in data) {
                /* 
                let image = document.createElement('img');
                image.src = data[i].image.desktop;
                image.alt = 'product image';

                document.body.appendChild(image);
                 */
                createProduct(data, i);
            }
        }

    } catch (error) {
        console.error(error);
    }
}

fetchData();

/* Selecting items */
let productsArea = document.querySelector('.products');

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
    price.innerText = data[x].price;

    description.appendChild(category);
    description.appendChild(name);
    description.appendChild(price);

    product.appendChild(description);

    productsArea.appendChild(product);
}