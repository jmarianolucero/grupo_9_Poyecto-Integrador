window.addEventListener('load', function(){
  let formulario = document.querySelector('#formulario');
  formulario.addEventListener('submit', validacionForm) 
})
function validacionForm(e) {
  e.preventDefault()

  //Email
  const email = document.getElementById('email').value
  const errorEmail = document.getElementById('errorEmail')
  const charEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(email)
  if (email === '') {
    errorEmail.classList.add('show')
    errorEmail.classList.remove('hidden')
    errorEmail.innerHTML = 'Debes ingresar tu correo electrónico'
    return
  } else if (!charEmail) {
    errorEmail.classList.add('show')
    errorEmail.classList.remove('hidden')
    errorEmail.innerHTML = 'Debes ingresar un email válido'
    return
  } else {
      errorEmail.classList.remove('show')
    errorEmail.classList.add('hidden')
  }

  //Contraseña
  const password = document.getElementById('password').value
  const errorPassword = document.getElementById('errorPassword')
  if (password.length < 8) {
    errorPassword.classList.add('show')
    errorPassword.classList.remove('hidden')
    errorPassword.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
    
  } else {
  this.submit()
  }

  
}
/*window.addEventListener('load', function(){
    let formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validacionForm) 
})
function validacionForm(e) {
    e.preventDefault()
  
  
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
  
 
    //Contraseña
    const password = document.getElementById('password').value;
    const errorPassword = document.getElementById('errorPassword')
    const charPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
      password,
    )
    if (password.length < 8) {
      errorPassword.classList.add('show')
      errorPassword.classList.remove('hidden')
      errorPassword.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
      return
    } else if(password.length > 7){
        errorImage.classList.remove('show')
        errorImage.classList.add('hidden')
    } else if (!charPass) {
      errorPassword.classList.add('show')
      errorPassword.classList.remove('hidden')
      errorPassword.innerHTML =
        'La contraseña debe contener minúsculas, mayúsculas, números y carcateres especiales'
        return
    }else if(charPass){
        errorImage.classList.remove('show')
        errorImage.classList.add('hidden')
    }
  
    this.submit()
  }*/