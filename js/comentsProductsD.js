/*localStorage.setItem("miGato", "Juan");
var cat = localStorage.getItem("miGato");*/
var keys = ['Daniel','Fernando','Hector','Itzel']

document.addEventListener('DOMContentLoaded',coments)
let containerComent
function coments(){
    let btn = document.getElementById('btn')
    btn.addEventListener('click',setComent)
}

function setComent(){
    let inputcoment = document.getElementById('coment');
    if(inputcoment.value == ''){}
    else {
    let containerComents = document.querySelector('containerComents')
    let coment = document.createElement('div')
    
    coment.classList.add('containerComent')

    containerComents.appendChild(coment)

    clearComent(inputcoment)
    }
}
function clearComent(inputcoment){
    inputcoment.value = ''
}
console.log(localStorage.getItem("miGato"))