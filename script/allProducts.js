const allProducts = document.querySelector('#all-products')

// const products = [
//     {id: 1, name: 'Amazon Tee', price: 100, img: './images/p1.webp'},
//     {id: 2, name: 'Michigan Wave', price: 90, img: './images/p2.webp'},
//     {id: 3, name: 'Los Angeles', price: 150, img: './images/p3.webp'},
//     {id: 4, name: 'Nevada Troops', price: 210, img: './images/p4.webp'},
//     {id: 5, name: 'Colorado Tech', price: 300, img: './images/p5.webp'},
//     {id: 6, name: 'GVSU Laker Champ', price: 70, img: './images/p6.webp'},
//     {id: 7, name: 'Harvard Rock', price: 97, img: './images/p7.webp'},
//     {id: 8, name: 'CMU Zone', price: 170, img: './images/p8.webp'},
//     {id: 9, name: 'Laker Village Tee', price: 81, img: './images/p9.webp'},
//     {id: 10, name: 'Grand Rapids SVI', price: 120, img: './images/p10.webp'},
//     {id: 11, name: 'Allendale Township', price: 160, img: './images/p11.webp'},
//     {id: 12, name: 'Santa Clara', price: 145, img: './images/p12.webp'},
//     {id: 13, name: 'New Jersey Ice', price: 109, img: './images/p13.jpg'},
//     {id: 14, name: 'NYC Shoe', price: 130, img: './images/p16.webp'},
// ]

let products = []
// let string = ''

// products.forEach(({id, name, price, img}, index)=>{
//     string+=`
//         <div class="col-3 col-l-4 col-m-6 col-s-12 padding-all-10 font-helvetica">
//             <div><img src="${img}" alt="" class="max-img" /></div>
//             <div>${name}</div>
//             <div>$${price.toFixed(2)}</div>
//             <div class="add-product-msg blue-text font-12 right-text"></div>
//             <div class="flex-row-reverse">
//                 <button data-index="${index}" data-name="${name}" data-price="${price}" data-img="${img}" data-id="${id}" class="add-product">Add</button>
//             </div>
//         </div>
//     `
// })

// allProducts.innerHTML = string

fetch('./products.php')
.then(response => response.json())
.then(response=>{
    if(response.status){
        products = response.data
        displayProduct(response.data)
    }else{
        displayProduct(response.data)
    }
})

displayProduct = array => {
    let str = ""
    if(array.length > 0){
        array.forEach(({id, name, price, img}, index)=>{
            str+=`
                <div class="col-3 col-l-4 col-m-6 col-s-12 padding-all-10 font-helvetica">
                    <div><img src="${img}" alt="" class="max-img" /></div>
                    <div>${name}</div>
                    <div>$${price.toFixed(2)}</div>
                    <div class="add-product-msg blue-text font-12 right-text"></div>
                    <div class="flex-row-reverse">
                        <button onclick="addToCart(${id}, '${name}', ${price}, '${img}')" data-index="${index}" data-name="${name}" data-price="${price}" data-img="${img}" data-id="${id}" class="add-product">Add</button>
                    </div>
                </div>
            `
        })
        
        allProducts.innerHTML = str
    }else{
        str+=`
            <div class="col-12 padding-all-10 font-helvetica">
                <div class="blue-text center-text">No Data availabe</div>
            </div>
        `
        allProducts.innerHTML = str
    }
}

const addToCart = (id, name, price, img) => {
    const obj = {id, price, name, img}

    let local = localStorage.getItem('gvsu-cart')
    local = local !== null ? JSON.parse(local) : []
    local.push(obj)
    localStorage.setItem('gvsu-cart', JSON.stringify(local))
}

// document.querySelectorAll('.add-product').forEach((element)=>{
//     element.addEventListener('click', e=>{console.log('here')
//         const price = Number(element.getAttribute('data-price'))
//         const name = element.getAttribute('data-name')
//         const img = element.getAttribute('data-img')
//         const id = Number(element.getAttribute('data-id'))
//         const index = element.getAttribute('data-index')
//         const msg = document.querySelectorAll('.add-product-msg')[index]

//         const obj = {id, price, name, img}

//         let local = localStorage.getItem('gvsu-cart')
//         local = local !== null ? JSON.parse(local) : []
//         local.push(obj)
//         localStorage.setItem('gvsu-cart', JSON.stringify(local))
//         msg.innerHTML = 'Item added'
//         setTimeout(()=>msg.innerHTML = '', 2500)
//     })
// })

document.querySelector('#product-search').addEventListener('input', e=>{
    const val = e.target.value
    console.log(val)
    const arr = []
    if(val !== ''){
        products.forEach(item=>{
            if(item.name.toLocaleLowerCase().indexOf(val) > -1){
                arr.push(item)
            }
        })
        displayProduct(arr)
    }else{
        displayProduct(products)
    }
})