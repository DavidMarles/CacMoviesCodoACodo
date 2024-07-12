const contenedor = document.getElementById('container__imagenes__api');

fetch('https://rickandmortyapi.com/api/character')

    .then(response => response.json())
    .then(datos => {
        datos.results.forEach(element => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = element.image;
            img.alt = element.name;
            img.style.width = '200px';
            img.style.borderRadius = '1rem';
            div.style.display= 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = "center";
            
            const p = document.createElement('p');
            p.textContent = element.name;
            div.appendChild(img);
            div.appendChild(p);
            contenedor.appendChild(div);
        });
    })
    .catch(err => console.log(err));
