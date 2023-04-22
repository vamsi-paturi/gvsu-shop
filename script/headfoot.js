const header = document.querySelector('#header')
const footer = document.querySelector('#footer')

header.innerHTML = `
    <div class="font-helvetica padding-all-20 black-bg">
        <div class="width-95 margin-auto">
            <div class="white-text row justify-content-space-between">
                <a href="./index.htm">
                    <div class="bold-text font-20 white-text">GVSU Nike Store</div>
                </a>
                <div class="bold-text font-20">
                    <a href="./cart.htm" class="white-text">
                        <i class="fi fi-rr-shopping-bag"><span id="cart-num"></span></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
`

const yearOfTheLord = new Date().getFullYear()

footer.innerHTML = `
    <div class="black-bg white-text center-text font-helvetica">
        <div class="padding-all-20"></div>
        <div>
            <span class="bold-text uppercase font-20">GVSU Nike Store</span> <span>&copy; ${yearOfTheLord}</span>
        </div>
        <div class="padding-all-20"></div>
    </div>
`

const getCart = () => {
    const cartNum = document.querySelector('#cart-num')
    let local = localStorage.getItem('gvsu-cart')
    local = local !== null ? JSON.parse(local) : []
    cartNum.innerHTML = local.length
    setTimeout(()=>getCart(),500);
}
getCart();