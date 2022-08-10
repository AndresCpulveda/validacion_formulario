//Variables
const form = document.querySelector('#enviar-mail');
const emailInput = document.querySelector('#email');
const asuntoInput = document.querySelector('#asunto');
const mensajeInput = document.querySelector('#mensaje');
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn')
const spinner = document.querySelector('#spinner')

//Event listeners
document.addEventListener('DOMContentLoaded', ()=> {
    enviarBtn.disabled = true;
    enviarBtn.classList.add('cursor-not-allowed', 'opacity-50')
})
resetBtn.addEventListener('click', resetForm)
emailInput.addEventListener('blur', validateForm)
asuntoInput.addEventListener('blur', validateForm)
mensajeInput.addEventListener('blur', validateForm)
enviarBtn.addEventListener('click', enviarForm)

//Functions
//Valida que el input contenga informacion y añade estilos al input para indicar su validacion
function validateForm(e) {
    if(e.target.value.length < 1){
        e.target.classList.add('border', 'border-red-500', 'not-valid')
        e.target.classList.remove('border-green-500', 'valid')
        showError('Llena todos los campos');
    }else{
        e.target.classList.remove('border-red-500', 'not-valid')
        e.target.classList.add('border-green-500', 'valid')
        showError()
    }
    validarEmail();
}

//Usa un regex para validar que la informacion ingresada sea un email
function validarEmail() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Asigna estilos segun la validez del email
    if(regex.test(emailInput.value)){
        console.log('si es valid');
        emailInput.classList.remove('not-valid', 'border-red-500')
        emailInput.classList.add('valid', 'border-green-500')
    }else{
        emailInput.classList.add('not-valid', 'border-red-500')
        emailInput.classList.remove('valid', 'border-green-500')
        showError('Email no valido')
    }
}

//Muestra un mensaje de error acorde a la invalidez del input 
function showError(message){
    limpiarHtml();
    //En una variable crea el elemento con el mensaje de error y lo estila
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message
    errorMessage.classList.add('error-message', 'text-red-600', 'border', 'border-red-600', 'uppercas', 'my-5', 'font-bold', 'flex', 'justify-center', 'p-2')
    //Revisa si todos los inputs son validos
    if(emailInput.classList.contains('not-valid') || asuntoInput.classList.contains('not-valid') || mensajeInput.classList.contains('not-valid')){
        //Si los inputs no son validos y el mensaje no existe, lo indexa
        if(!form.querySelector('.error-message')){
            form.appendChild(errorMessage);
        }
    //Si todos los inputs son validos borra el mensaje
    }else if(emailInput.classList.contains('valid') && asuntoInput.classList.contains('valid') && mensajeInput.classList.contains('valid')){
        limpiarHtml();
        enviarBtn.classList.remove('cursor-not-allowed', 'opacity-50')
        enviarBtn.disabled = false;
    }
}

//Limpia el html del mensaje de error para dejar de mostrar el mensaje o para volver a mostrarlo sin repetirlo
function limpiarHtml(){
    while(form.querySelector('p')){
        const trash = form.querySelector('.error-message');
        form.removeChild(trash)
    }
}

//Borra todos los campos del form, el mensaje de error y los estilos de los input
function resetForm() {
    limpiarHtml();
    emailInput.classList.remove('border-green-500', 'border-red-500', 'not-valid', 'valid')
    asuntoInput.classList.remove('border-green-500', 'border-red-500', 'not-valid', 'valid')
    mensajeInput.classList.remove('border-green-500', 'border-red-500', 'not-valid', 'valid')
    emailInput.value = ''
    asuntoInput.value = ''
    mensajeInput.value = ''
}

//Enviar el formulario y muestra animacion de spinner
function enviarForm(e) {
    e.preventDefault();
    spinner.style.display = 'flex'

    //Despues de 3 segundos quita el spinner

    setTimeout( () => {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Enviado con exito!'
        successMessage.classList.add('error-message', 'text-green-600', 'border', 'border-green-600', 'uppercas', 'my-5', 'font-bold', 'flex', 'justify-center', 'p-2')
        form.appendChild(successMessage);
        spinner.style.display = 'none'
    }, 2000)
}