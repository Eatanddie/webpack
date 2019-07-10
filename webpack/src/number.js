function number() {
    var div = document.createElement('div')
    div.innerHTML = 2000
    div.setAttribute('id', 'number')
    document.body.appendChild(div)
}

export default number