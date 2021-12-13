window.addEventListener('load', function(){
    let formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validacionForm) 
})
function validacionForm(e) {
    e.preventDefault()
  
    //Nombre
    const nombre = document.getElementById('nombre').value
    const errorNombre = document.getElementById('errorNombre')
    if (nombre.length == 0) {
      errorNombre.classList.add('show')
      errorNombre.classList.remove('hidden')
      errorNombre.innerHTML = 'Debes ingresar tu nombre completo'
    } else if (nombre.length > 0){
        errorNombre.classList.remove('show')
      errorNombre.classList.add('hidden')
    }
  
    //Email
    const email = document.getElementById('email').value
    const errorEmail = document.getElementById('errorEmail')
    const charEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(email)
    if (email === '') {
      errorEmail.classList.add('show')
      errorEmail.classList.remove('hidden')
      errorEmail.innerHTML = 'Debes ingresar tu correo electrónico'
    }else if (email !== ''){
        errorEmail.classList.remove('show')
      errorEmail.classList.add('hidden')
    } else if (!charEmail) {
      errorEmail.classList.add('show')
      errorEmail.classList.remove('hidden')
      errorEmail.innerHTML = 'Debes ingresar un email válido'
    } else if (charEmail){
        errorEmail.classList.remove('show')
      errorEmail.classList.add('hidden')
    }
  
    //Imagen de Usuario
    const UserImage = document.getElementById('userImage').value
    const errorImage = document.getElementById('errorImage')
    const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i
    if (!allowedExtensions.exec(UserImage)) {
      errorImage.classList.add('show')
      errorImage.classList.remove('hidden')
      errorImage.innerHTML =
        'Formatos admitidos: .jpeg - .jpg - .png'
    } else if (allowedExtensions.exec(UserImage)){
        errorImage.classList.remove('show')
        errorImage.classList.add('hidden')
    }
  
    //Contraseña
    const password = document.getElementById('password').value
    const errorPassword = document.getElementById('errorPassword')
    const charPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
      password,
    )
    if (password.length < 8) {
      errorPassword.classList.add('show')
      errorPassword.classList.remove('hidden')
      errorPassword.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
      return
    } else if (!charPass) {
      errorPassword.classList.add('show')
      errorPassword.classList.remove('hidden')
      errorPassword.innerHTML =
        'La contraseña debe contener minúsculas, mayúsculas, números y carcateres especiales'
        return
    } else {
        errorImage.classList.remove('show')
        errorImage.classList.add('hidden')
    }
  
    this.submit()
  }