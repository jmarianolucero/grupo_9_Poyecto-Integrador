window.addEventListener("load", function() {
    let producto = document.querySelector("#form")

    producto.addEventListener("submit", function(e){


        let errores = []

        let nombre = document.getElementById("nombre")
        let descripcion = document.getElementById("descripcion")
        let imagen = document.getElementById("productImage")

        /* validacion nombre */
        if(nombre.value == ""){
            errores.push("el campo de NOMBRE tiene que estar completo")
        }
        if (nombre.value.length<5){
            errores.push("el campo de NOMBRE debe tener al menos 5 caracteres")
        }

        /* validacion descripcion */
        if (descripcion.value.length<20){
            errores.push("el campo de DESCRIPCION debe tener al menos 5 caracteres")
        }


        if (errores.length>0){
            e.preventDefault();
            let ulerrores =document.getElementById("errores")
            for (let i = 0; i < errores.length; i++) {

                ulerrores.innerHTML += "<li class= 'text-danger'>" + errores[i] + "</li>"

            }
        }
    });
}) 