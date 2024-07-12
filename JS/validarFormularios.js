//pagina de registro

document.getElementById('formuluario__registro').addEventListener('submit', function(event){
    event.preventDefault(); //evita el envío automático de los datos.

    if(validarFormulario(this)){
        this.onsubmit();
    }
});

function limpiarError(){
    var avisoError = document.getElementsByClassName('error');
    for (let  i=0; i < avisoError.length;i++){
        avisoError[i].innerHTML = '';
    }
    
}

function validarFormulario(formuluario__registro){
    limpiarError()
    if(formuluario__registro.nombre.value.length < 3){
        document.getElementById('errorNombre').innerText = "Completar Campo";
        formuluario__registro.nombre.focus();
        return false;
    }

    if(formuluario__registro.apellido.value.length < 3){
        document.getElementById('errorApellido').innerText = "Completar Campo";
        formuluario__registro.apellido.focus();
        return false;
    }

    var expReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(formuluario__registro.email.value.length < 3 && !expReg.test(formuluario__registro.email.value)){
        document.getElementById('errorEmail').innerText = "Ingrese su email con el formato mail@dominio.com"
        formuluario__registro.email.focus();
        return false;
    }

    var email = formuluario__registro.email.value;
    localStorage.setItem('email', email);

    if(formuluario__registro.clave.value.trim().length < 3){
        document.getElementById('errorClave').innerText = "Contraseña Inválida"
        formuluario__registro.clave.focus();
        return false;

    }

    var clave = formuluario__registro.clave.value;
    localStorage.setItem('clave', clave);

    if(formuluario__registro.clave.value != formuluario__registro.confirmaClave.value){
        document.getElementById('errorConfirmaClave').innerText = "las contraseñas deben ser iguales"
        formuluario__registro.clave.focus();
        return false;

    }

    if(formuluario__registro.fecha_nacimiento.value == ''){
        document.getElementById('errorFechaNacimiento').innerText = "Ingrese una fecha de nacimiento"
        formuluario__registro.fecha_nacimiento.focus();
        return false;
    }

    if(formuluario__registro.fecha_nacimiento.value == ''){
        document.getElementById('errorFechaNacimiento').innerText = "Ingrese una fecha de nacimiento"
        formuluario__registro.fecha_nacimiento.focus();
        return false;
    }

    if(formuluario__registro.pais.value == ''){
        document.getElementById('errorPais').innerText = "ingrese un país"
        formuluario__registro.pais.focus();
        return false;
    }

    if(!formuluario__registro.terminos.checked){
        document.getElementById('errorTerminos').innerText = "Debe aceptar los terminos y condiciones"
        formuluario__registro.terminos.focus();
        return false;
    }

    alert('Datos ingresados correctamente');
    return true;
}



