addEventListener("DOMContentLoaded", ()=>{

    const imagenes = [1,2,3,4,5,6,7,8]
    let i = 1
    const img1 = document.querySelector("#img1")
    const img2 = document.querySelector("#img2")
    const progressbar = document.querySelector("#progress-bar")
    const divIndicadores = document.querySelector("#indicadores")
    let porcentaje_base = 100/imagenes.length
    let porcentaje_actual = porcentaje_base

    for (let index = 0; index < imagenes.length; index++) {
        const div = document.createElement("div")
        div.classList.add("circles")
        div.id = index
        divIndicadores.appendChild(div)
    }

})






/* ---div anterior del carrousel--

<div class="carrousel">
                <a href=""><i class="fas fa-arrow-left"></i></a>
                <div><img src="/images/imagen1-home-musicBox.png" alt=""></div>
                <a href=""><i class="fas fa-arrow-right"></i></a>
            </div>
*/