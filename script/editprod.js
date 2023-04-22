const form = document.querySelector('form')
const error = document.querySelector('#error')

form.addEventListener('submit', e=>{
    e.preventDefault();
    const id = document.querySelector('#id').value
    const name = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const image = document.querySelector('#image').files[0]
    const dimage = document.querySelector('#dimage').value

    if(name && price){
        if(Number(price)){
            if(image){
                const formData = new FormData()
                formData.append('name', name)
                formData.append('price', price)
                formData.append('image', image)
                formData.append('id', id)
                formData.append('dimage', dimage)
                const context = {
                    method: 'POST',
                    body: formData
                }

                fetch('./products.php', context)
                .then(response => response.json())
                .then(response=>{
                    if(response.status){
                        error.innerHTML = response.message
                        setTimeout(()=>{
                            window.location = './dashboard.php?product'
                        }, 2000)
                    }else{
                        error.innerHTML = response.message
                        setTimeout(()=>error.innerHTML = '', 3000)
                    }
                })
            }else{
                const context = {
                    header: {
                        'Content-Type': 'Application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify({id, name, price})
                }
                fetch('./products.php', context)
                .then(response => response.json())
                .then(response=>{
                    if(response.status){
                        error.innerHTML = response.message
                        setTimeout(()=>{
                            window.location = './dashboard.php?product'
                        }, 3000)
                    }else{
                        error.innerHTML = response.message
                        setTimeout(()=>error.innerHTML = '', 3000)
                    }
                })
            }
        }else{
            error.innerHTML = 'Value must be a number'
            setTimeout(()=>error.innerHTML = '', 3000)
        }
    }else{
        error.innerHTML = 'All the fields are required.'
        setTimeout(()=>error.innerHTML = '', 3000)
    }
})