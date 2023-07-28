let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  pagina += 1;
  cargarPeliculas();
});

btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=89c8b3c14254938af927c09b68560c0f&page=${pagina}`);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      

	  let peliculas = '';
	  datos.results.forEach(pelicula => {
		  peliculas += `
	  <div class="col-md-3">
		<div class="pelicula text-center">
		  <img class="poster img-fluid rounded smaller-image" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
		  <h3 class="titulo mt-2">${pelicula.title}</h3>
		</div>
	  </div>
	`;
	  });

      document.querySelector('#container .row').innerHTML = peliculas;

      // Hover de las imágenes.
      const imagenes = document.querySelectorAll('.poster');
      imagenes.forEach(imagen => {
        imagen.addEventListener('mouseover', () => {
          imagen.classList.add('zoomed'); // Clase 'zoomed' al pasar el cursor.
        });

        imagen.addEventListener('mouseout', () => {
          imagen.classList.remove('zoomed'); // Eliminar clase 'zoomed' al quitar el cursor.
        });
      });
    } else {
      console.log('Error al cargar las películas');
    }
  } catch (error) {
    console.log(error);
  }
}

cargarPeliculas();
