const serverMessage = () => {
    const url = new URL(window.location.href)
    const search = new URLSearchParams(url.search)
    const msg = search.has('msg') ? search.get('msg') : null
    const error = document.querySelector('#error')

    if(msg){
        if(msg === 'success'){
            error.classList.toggle('green-text')
            error.innerHTML = msg
            setTimeout(() => {
                error.innerHTML = ''
                error.classList.toggle('green-text')
            }, 3000)
        }else{
            error.classList.toggle('red-text')
            error.innerHTML = msg
            setTimeout(() => {
                error.innerHTML = ''
                error.classList.toggle('red-text')
            }, 3000)
        }
    }
}

setTimeout(() => serverMessage(),)