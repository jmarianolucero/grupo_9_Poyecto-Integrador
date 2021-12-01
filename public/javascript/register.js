window.addEventListener('load', function(){
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        let errores = [];
        let nombre = document.querySelector('#nombre');
        if (nombre.value == ''){
            errores.push('Debes completar con tu nombre completo')
        } else if (nombre.value.length < 3){
            errores.push('El campo debe tener al menos 2 caracteres')
        }
        let nombreUsuario = document.querySelector('#nick');
        
    })
})
