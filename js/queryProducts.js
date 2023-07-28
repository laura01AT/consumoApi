var containerGrid = document.querySelector('.containerGrid');
var products = [];
var fragmetProducts = new DocumentFragment();

fetch('https://fakestoreapi.com/products?limit=15')
    .then(res=>res.json())
    .then(json=>{
        json.forEach(element => {
            var card = document.createElement('div')
            card.classList.add('product-card')
            card.innerHTML = `<div class="badge">Hot</div>
            <div class="product-tumb">
                <img src="${element.image}" alt="">
            </div>
            <div class="product-details">
                <span class="product-catagory">${element.category}</span>
                <h4><a href="">${element.title}</a></h4>
                <p>${element.description}</p>
                <div class="product-bottom-details">
                    <div class="product-price">$ ${element.price}</div>
                    <div class="product-links">
                        <a href=""><i class="fa fa-heart"></i></a>
                        <a href=""><i class="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>`    
            fragmetProducts.appendChild(card)
        });
    containerGrid.appendChild(fragmetProducts)
    })

