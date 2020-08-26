require('./index.css')
require('./a.less')
require('./a.js')

console.log($, '$')

console.log('111')


import logo from '../assets/test.jpg'
let image = new Image()
image.src = logo
document.body.appendChild(image)