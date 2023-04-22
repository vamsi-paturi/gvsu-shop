const form = document.querySelector('form')
const error = document.querySelector('#error')
form.addEventListener('submit', e=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const image = document.querySelector('#image').files[0]

    if(name && price){
        if(Number(price)){
            if(image){
                const formData = new FormData()
                formData.append('name', name)
                formData.append('price', price)
                formData.append('image', image)
                const context = {
                    method: 'POST',
                    body: formData
                }
                fetch('./products.php', context)
                .then(response=>response.json())
                .then(response=>{
                    if(response.status){
                        form.reset()
                        error.innerHTML = response.message
                        setTimeout(()=>error.innerHTML = '', 3000)
                        fetchProducts()
                    }else{
                        error.innerHTML = response.message
                        setTimeout(()=>error.innerHTML = '', 3000)
                    }
                })
            }else{
                error.innerHTML = 'Product image is required'
                setTimeout(()=>error.innerHTML = '', 3000)
            }
        }else{
            error.innerHTML = 'Price must be a number value'
            setTimeout(()=>error.innerHTML = '', 3000)
        }
    }else{
        error.innerHTML = 'All the fields are required.'
        setTimeout(()=>error.innerHTML = '', 3000)
    }
})

const tbody = document.querySelector('tbody')
displayProduct = array => {
    let str = ""
    if(array.length > 0){
        array.forEach(({id, name, price, img}, index)=>{
            str+=`
                <tr>
                   <td>${id}</td>
                   <td>${name}</td>
                   <td>${price}</td>
                   <td>
                        <button onclick="editProduct(${id}, '${name}', ${price}, '${img}' )" style="padding: 5px" class="blue-bg white-text font-20 cursor-pointer"><i class="fi fi-rr-edit"></i></button>
                   </td>
                   <td>
                        <button onclick="deleteProduct({'id':${id}, 'img': '${img}'})" style="padding: 5px" class="red-bg white-text font-20 cursor-pointer"><i class="fi fi-rr-trash"></i></button>
                   </td>
                </tr>
            `
        })
        
        tbody.innerHTML = str
    }else{
        str+=`
            <tr>
                <td colspan="5">
                    <div class="center-text">No Available Data</div>
                </td>
            </tr>
        `
        tbody.innerHTML = str
    }
}

const fetchProducts = () => {
    fetch('./products.php')
    .then(response => response.json())
    .then(response=>{
        if(response.status){
            displayProduct(response.data)
        }else{
            displayProduct([])
        }
    })
    // setTimeout(()=>fetchProducts(), 1000)
}
fetchProducts()

const editProduct = (id, name, price, img) => {
    window.location = `./dashboard.php?editprod=${id}&name=${name}&price=${price}&img=${img}`
}

const deleteProduct = ({id, img}) => {
    const context = {
        header: {
            'Content-Type': 'Application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({id, img})
    }
    fetch('./products.php', context)
    .then(response=>response.json())
    .then(response=>{
        if(response.status){
            fetchProducts()
        }
    })
}