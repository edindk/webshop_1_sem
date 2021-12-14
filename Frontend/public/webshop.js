function addToCart(obj) {
    let tempProductList = [];
    let products = window.localStorage.getItem('shoppingCart');

    if (!products) {
        tempProductList.push(obj);
        window.localStorage.setItem('shoppingCart', JSON.stringify(tempProductList));
    }
    else {
        let found = false;

        tempProductList = JSON.parse(products);
        tempProductList.forEach(function (product) {
            if (product.productID === obj.productID) {
                product.quantity += 1;
                found = true;
            }
        });

        if (!found) {
            tempProductList.push(obj);
        }
    }
    window.localStorage.setItem('shoppingCart', JSON.stringify(tempProductList));
}

// Adds events on all add to cart buttons
function addEventOnAddBtn() {
    let addToCartBtns = document.getElementsByClassName("addToCartBtn");
    
    Array.from(addToCartBtns).forEach(function (btn) {
        btn.addEventListener("click", e => {
            e.preventDefault();

            let productElement = e.target.parentNode.querySelector('a');
            let imgFile = productElement.querySelector('img').getAttribute('src');
            let name = productElement.querySelector('h4').textContent;
            let productID = productElement.querySelector('p.productID').textContent;
            let description = productElement.querySelector('p.description').textContent;
            let price = productElement.querySelector('p.price').textContent;

            let obj = { "imgFile": imgFile, "name": name, "productID": productID, "price": price, "description": description, "quantity": 1 };
            addToCart(obj);
        });
    });
}