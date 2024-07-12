//CÓDIGO PARA ENVIAR LA PELÍCULA

// cuando el dom (modelo de objeto de documento) se cargue
// Este evento se dispara cuando todo el HTML del documento se ha cargado
// y se ha analizado por completo.
document.addEventListener('DOMContentLoaded', async () => {
    // tengo que levantar los datos del formulario, validar los inputs,
    // en caso de algun value vacio, mostrar un mensaje de error
    // y no hacer la peticion fetch
    // si los datos son correctos, realizo la peticion fetch post
    // a la api para agregar una pelicula
    // si la respuesta es correcta, muestro un mensaje de exito y
    // limpio los inputs del formulario
    
    // Obtengo el formulario
    // Aquí, obtenemos una referencia al formulario con el ID formNuevaPelicula.
    formNuevaPelicula = document.getElementById('formulario__admin__peliculas');


    // Agrego el evento submit al formulario
    // Añadimos un evento que se dispara cuando el formulario se envía.
    // La función que se pasa al listener se ejecutará cada vez que el formulario se envíe.
    formNuevaPelicula.addEventListener('submit', async (event) => {

        // Prevenimos el comportamiento por defecto del formulario
        // Esto evita que el formulario se envíe de la manera tradicional y recargue la página.
        event.preventDefault();

        // Obtener los datos del formulario:
        // Aquí, usamos FormData para extraer los valores de los campos del formulario.
        const formData = new FormData(formNuevaPelicula);

        //obtengo los valores de los inputs
        const titulo = formData.get('titulo');
        const genero = formData.get('genero');
        const duracion = formData.get('duracion');
        const imagen = formData.get('imagen');

        // Validar los datos del formulario:
        // Verificamos que todos los campos obligatorios tienen un valor.
        // Si alguno está vacío, mostramos una alerta y detenemos el procesamiento.
        if (titulo === '' || genero === '' || duracion === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Preparar los datos para el envío:
        // levanto solo el nombre del file para enviarlo a la api
        // Esta línea simplemente extrae el nombre del archivo seleccionado por el usuario 
        // en el campo de tipo file del formulario y lo guarda en la variable 
        // imageName para su uso posterior en la solicitud HTTP.
        const imageName = imagen.name;
      
        //configuracion de options, que contiene los detalles de la solicitud POST,
        // incluyendo el método, las cabeceras y el cuerpo. 
        // El cuerpo es un objeto JSON que se convierte en una cadena con JSON.stringify.
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                genero: genero,
                duracion: duracion,
                imagen: imageName
            })
        };

        // Realizo la peticion fetch a la api para agregar una pelicula
        const response = await fetch('http://localhost:8080/movies/RegistroPeliculas', options);
        // Utilizamos fetch para enviar la solicitud al servidor y esperamos la respuesta. 
        // Luego, convertimos la respuesta a JSON.
        //obtengo la respuesta
        const data = await response.json();


        // Manejar la respuesta del servidor:
        // si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
        // si el codigo es 201, la pelicula se agrego correctamente
        if (response.status === 201) {
            alert('Pelicula agregada correctamente');
            formNuevaPelicula.reset();
            // que se recargue la pagina para ver la pelicula agregada
            location.reload();
        } else {
            alert('Error al agregar la pelicula');
        }
       
    });

});

//CÓDIGO PARA MOSTRAR LA PELÍCULA

// Este código JavaScript se ejecuta cuando el DOM (Document Object Model) 
// ha sido completamente cargado. 
// Hace una solicitud GET a un servidor para obtener una lista de películas, 
// y luego crea y añade elementos de tabla para cada película al cuerpo de una tabla.

// Este código se ejecuta cuando el DOM ha sido completamente cargado y analizado,
// pero antes de que se hayan cargado completamente las hojas de estilo, las imágenes y los subframes.
document.addEventListener('DOMContentLoaded', async () => {

    // realizamos una peticion fetch a esta api para obtener todas las peliculas de la base:
    // El método GET se usa para recuperar datos, y se especifica que el contenido será JSON.
    // configuracion de options, es un get y no necesita body
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Hacer una solicitud fetch y esperar la respuesta:
    // Esta línea hace una solicitud HTTP GET a la URL especificada y espera la respuesta del servidor.
    const response = await fetch('http://localhost:8080/movies/RegistroPeliculas', options);

    // Convertir la respuesta a JSON:
    const data = await response.json();

    // Imprimir los datos en la consola:
    //console.log(data);
    //{idPelicula: 2, titulo: 'Transformers 2', genero: 'Accion', duracion: '3h 2m', imagen: 'transformers.jpg'}
    // Extraemos las películas de la respuesta
    const movies = data;
    // tenemos que insertar todas las peliculas en la tabla con id tablePeliculas, pero en tbody con la siguiente estructura de ejemplo:
    /*<!--este es solo un ejemplo porque se va a llenar desde js-->
                    <tr>
                        <td>The Super Mario Bros. Movie (2023)</td>
                        <td>3h 22m</td>
                        <td>Animation, Family, Adventure, Fantasy, Comedy</td>
                        <td><img width="150px" src="../assets/img/mario.jpg" alt="mario pelicula 2023"></td>
                        
                    </tr> 
    */
  
    //obtenemos el tbody de la tabla
    const tbody = document.getElementById('cuerpo__tabla__peliculas');

    // recorremos todas las peliculas
    movies.forEach(movie => {
        // creamos un tr
        const tr = document.createElement('tr');
        // creamos un td con el titulo de la pelicula
        const tdTitle = document.createElement('td');
        tdTitle.textContent = movie.titulo;
        // creamos un td con la duracion de la pelicula
        const tdDuration = document.createElement('td');
        tdDuration.textContent = movie.duracion;
        // creamos un td con los generos de la pelicula
        const tdGenres = document.createElement('td');
        tdGenres.textContent = movie.genero;
        // creamos un td con la imagen de la pelicula
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        
        
        
        img.src = "../assets/" + movie.imagen;
        img.width = '150';
        img.alt = movie.titulo;
        img.style.borderRadius = "1rem";
        tdImage.appendChild(img);
        //agrego la clase a la imagen para que se vea mejor de bootstrap fluid y thumbnail
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');
        
        // añadimos los td al tr
        tr.appendChild(tdTitle);
        tr.appendChild(tdDuration);
        tr.appendChild(tdGenres);
        tr.appendChild(tdImage);
        // añadimos el tr a al body
        tbody.appendChild(tr);

    });

/*
       movies.forEach( movie => {

      const tr = document.createElement('tr');

      tr.innerHTML = `
            <td>${movie.titulo}</td>
            <td>${movie.genero}</td>
            <td>${movie.duracion}</td>
            <td>
               <img width="150px" src="../assets/img/${movie.imagen}" alt="${movie.titulo}">
            </td>
            </tr>
      `
     tbody.appendChild(tr); 

   });
*/
});