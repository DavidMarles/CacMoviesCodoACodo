document.getElementById('inicioSesion').addEventListener('submit', function(event){
    event.preventDefault(); //evita el envío automático de los datos.

    if(validarInicioSesion(this)){
        this.onsubmit();
    }
});

function limpiarError(){
    var avisoError = document.getElementsByClassName('error');
    for (let  i=0; i < avisoError.length;i++){
        avisoError[i].innerHTML = '';
    }
    
}

function validarInicioSesion(inicioSesion){
    limpiarError()

    const emailSesion = localStorage.getItem('email');
    const claveSesion = localStorage.getItem('clave');
    const mailInicio = inicioSesion.mailInicio.value;
    const claveInicio = inicioSesion.claveInicio.value;

    if (inicioSesion.mailInicio.value.length < 3){
        document.getElementById('errorEmail').innerText = "Por favor, se requiere de su email"
        inicioSesion.mailInicio.focus();
        return true; 
    }

    if (inicioSesion.claveInicio.value.length < 3){
        document.getElementById('errorClave').innerText = "Por favor, se requiere de su contraseña"
        inicioSesion.claveInicio.focus();
        return true; 
    }

    if(mailInicio === emailSesion && claveInicio === claveSesion){
        alert('Inicio de sesión exitoso');
        window.location.href = "../HTML/peliculas.html";
        return true;
    }
    

    alert('Los datos del usuario no coinciden');
    
     return false;

}



