const displayData = arr => {
    const tbody = document.querySelector('tbody')
    let str = ''

    if(arr.length > 0){
        arr.forEach(({id, fullname, cart}, index)=>{
            let total = 0
            const num = index + 1
            cart.forEach(item=>{
                total = total + item.price
            })
            str+=`
                <tr>
                    <td>${num}</td>
                    <td>${fullname}</td>
                    <td>${cart.length}</td>
                    <td>${total}</td>
                </tr>
            `
        })
    }else{
        str+=`
            <tr>
                <td colspan="4" class="center-text">Empty List</td>
            </tr>
        `
    }

    tbody.innerHTML = str
}

const getData = () => {
    fetch(`./api.php`)
    .then(res => res.json())
    .then(res=>{
        displayData(res)
    })
}

setTimeout(() => getData(), 1000)