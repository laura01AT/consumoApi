let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');

// >>>>>>>>>>>>>>>>>>>>>>>>>>Cargar Películas<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
  cards.innerHTML = cardContent;
  document.getElementById("preloader").style.display = "none";
}

cargarPeliculas();


// >>>>>>>>>>>>>>>>>>>> Comentarios <<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Mostrar comentarios
function displayComments() {
  // Obtener comentarios del Local Storage
  const comments = JSON.parse(sessionStorage.getItem('comments')) || [];

  // Limpiar contenedor de comentaris antes de mostrarlos
  commentsContainer.innerHTML = '';

  // Mostrar cada comentario en contenedor
  comments.forEach((comment) => {
    const { name, commentText, timestamp } = comment;
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('border', 'p-3', 'mb-3');

    const commentHeader = document.createElement('div');
    commentHeader.classList.add('font-weight-bold');
    commentHeader.textContent = `${name} - ${new Date(timestamp).toLocaleString()}`;

    const commentTextElement = document.createElement('div');
    commentTextElement.textContent = commentText;

    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentTextElement);

    commentsContainer.appendChild(commentDiv);
  });
}

// Agregar nuevo comentario
function addComment(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');

  const name = nameInput.value;
  const commentText = commentInput.value;
  const timestamp = Date.now();

  // Obtener comentarios del Local Storage
  const comments = JSON.parse(sessionStorage.getItem('comments')) || [];

  // Agregar nuevo comentario a la lista
  comments.push({ name, commentText, timestamp });

  // Guardar lista actualizada en Local Storage
  sessionStorage.setItem('comments', JSON.stringify(comments));

  // Limpiar campos formulario
  nameInput.value = '';
  commentInput.value = '';

  // Mostrar comentarios actualizados
  displayComments();
}

// Agregar un evento 'submit' al formulario para agregar comentarios
commentForm.addEventListener('submit', addComment);

// Mostrar comentarios al cargar página
displayComments();