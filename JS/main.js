const imagen__pelicula = document.querySelectorAll('.imagen__pelicula');
const titulo__pelicula = document.querySelectorAll('.titulo__pelicula');

imagen__pelicula.forEach((imagen, index) => {
    imagen.addEventListener('mouseover', () => {
      imagen.style.filter = 'blur(10px)'; // Aplica el efecto de desenfoque
      titulo__pelicula[index].style.visibility = 'visible'; // Muestra el título correspondiente
      titulo__pelicula[index].style.opacity = 1; // Aumenta la opacidad del título
    });
  
    imagen.addEventListener('mouseout', () => {
      imagen.style.filter = 'none'; // Elimina el efecto de desenfoque
      titulo__pelicula[index].style.visibility = 'hidden'; // Oculta el título correspondiente
      titulo__pelicula[index].style.opacity = 0; // Disminuye la opacidad del título
    });
  });