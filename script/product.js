const product = products.find(products=>products.id === id)

if(!product){
    window.location = '/products'
}

document.querySelectorAll('div').forEach(item=>{
    if(item.hasAttribute('data-product')){
        let str = `
            <div class="padding-all-20"></div>

            <div class="row font-helvetica">
                <div class="col-8 col-lx-7 col-l-12 col-m-12 col-s-12 padding-all-5">
                    <div class="row">
        `

        product.images.forEach((img, i) =>{
            str+=`
                <div class="${i < 4 ? "col-6 col-l-3 col-m-4 padding-all-5" : "display-none"}">
                    <img src="${img}" alt="" class="max-img" />
                </div>
            `
        })

        str+=`
                    </div>
                </div>
                <div class="col-4 col-lx-5 col-l-12 col-m-12 col-s-12 padding-all-5">
                    <div class="padding-all-10"></div>
                    <div class="width-90 margin-auto">
                        <div class="font-25">${!product ? '' : product.title}</div><br />
                        <div class="">$${!product ? '' : product.price}</div><br />
                        <button onclick="addToCart()" class="width-100 width-l-40 nike-add-btn">Add to Bag</button><br /><br />
                        <button class="width-100 width-l-40 white nike-add-btn">Favorite <i class="fi fi-rr-heart font-12"></i></button><br /><br />

                        <div class="padding-all-10"></div>
                        <a href="/products" class="go-back-btn">Go back</a>
                    </div>
                </div>
            </div>

            <div class="padding-all-20"></div>
        `

        item.innerHTML = str
    }
})

addToCart = () => {
    let img = product.images[0]
    let productItem = {...product}
    delete(productItem.images)
    productItem.img = img
    let cart = localStorage.getItem('nike-cart')
    cart = cart === null ? [] : JSON.parse(cart)
    if(cart.length === 0){
        productItem.qty = 1
        cart.push(productItem)
        localStorage.setItem('nike-cart', JSON.stringify(cart))
    }else{
        let findItem = cart.find(item=>item.id === productItem.id)
        if(!findItem){
            productItem.qty = 1
            cart.push(productItem)
            localStorage.setItem('nike-cart', JSON.stringify(cart))
        }
    }
}