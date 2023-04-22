let nike_cart
let total_price = 0

cartFunc = () => {
    let nikeCart = localStorage.getItem('gvsu-cart')
    nikeCart = nikeCart !== null ? JSON.parse(nikeCart) : []
    nike_cart = nikeCart
    let cartQty = nikeCart.length
    let total = 0
    nikeCart.forEach(cartItem=>{
        //cartQty += cartItem.qty
        total = total + cartItem.price
    })
    total_price = total.toFixed(2)
    document.querySelectorAll('span').forEach(span=>{
        if(span.hasAttribute('data-cart-num')){
            span.innerHTML = cartQty
        }else if(span.hasAttribute('data-total-cart-items')){
            span.innerHTML = `${cartQty}`
        }else if(span.hasAttribute('data-total-price')){
            span.innerHTML = `$${total.toFixed(2)}`
        }
    })
    setTimeout(() =>cartFunc(),)
}
cartFunc()

displayCartItems = () => {
    document.querySelectorAll('div').forEach(item=>{
        if(item.hasAttribute('data-cart-list')){
            let str = `
                <div class="font-25">Bag</div>
                <div class="padding-all-10"></div>
            `
            if(nike_cart.length === 0){
                str+=`
                    <div>
                        Please visit our <a href="./product.htm"><span class="blue-text">product</span></a> section to add items to your cart
                    </div>
                `
            }else{
                nike_cart.forEach((item, index)=>{
                    str+=`
                        <div class="row padding-all-5" key={index}>
                            <div class="col-3 col-m-4">
                                <img src="${item.img}" alt="" class="max-img"/>
                            </div>
                            <div class="col-1"></div>
                            <div class="col-8 col-m-7">
                                <div class="row justify-content-space-between">
                                    <div class="col-9">
                                        <div>${item.name}</div>
                                        <div class="padding-all-5"></div>
                                        <div class="row">
                                            <div class="col-2 cursor-pointer">
                                                <i onclick="removeCartItem(${item.id}, ${index})" class="fi fi-rr-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3 right-text">
                                        <div>${item.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                })
            }
            item.innerHTML = str
        }else if(item.hasAttribute('data-summary')){
            nike_cart.length === 0 ? item.innerHTML = '' : ''
        }
    })
}
displayCartItems()

removeCartItem = (id, index) => {
    const copy = nike_cart.slice()
    copy.splice(index, 1)
    const mycart = copy
    //const mycart = nike_cart.filter(item=>item.id !== id)
    localStorage.setItem('gvsu-cart', JSON.stringify(mycart))
    setTimeout(()=>displayCartItems(),100)
}

const makePayment = e => {
    e.preventDefault()
    const fullname = document.querySelector('#fullname').value
    const email = document.querySelector('#email').value
    const error = document.querySelector('#err-message')

    const local = localStorage.getItem('gvsu-cart')
    const cart = local !== null ? JSON.parse(local) : []

    const url = './cart.php'
    const options = {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({fullname, email, cart})
    }

    if(fullname && email){
        if(cart.length > 0){
            fetch(url, options)
            .then(res=>res.json())
            .then(res=>{
                if(res.status){
                    error.innerHTML = 'Request was successful'
                    setTimeout(()=>{
                        error.innerHTML = ''
                        localStorage.removeItem('gvsu-cart')
                        window.location.href = './product.htm'
                    }, 1500)
                }else{
                    error.innerHTML = 'Request failed. Try again'
                    setTimeout(() => error.innerHTML = '', 2500)
                }
            }).catch(err=>{console.log(err)
                error.innerHTML = 'Request was unsuccessful'
                setTimeout(()=>{
                    error.innerHTML = ''
                    localStorage.removeItem('gvsu-cart')
                    window.location.href = './product.htm'
                }, 1500)
            })
        }else{
            error.innerHTML = 'Please add items to cart to proceed'
            setTimeout(() =>error.innerHTML = '', 2500)
        }
    }else{
        error.innerHTML = 'Fullname is required'
        setTimeout(()=>error.innerHTML = '', 2500)
    }
    //console.log('')
}