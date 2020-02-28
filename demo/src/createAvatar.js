import avatar from './avatar.jpg'

export default function createAvatar() {
    var img = new Image()
    img.src = avatar
    img.classList.add('avatar')
    document.getElementById('root').append(img)
}