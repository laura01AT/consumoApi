const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');


const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=batman';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4ce7aac6ccmsh910af9248acee18p1916aajsn026d1bd6b64d',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

fetch(url, options)
  .then(response => response.json())
  //.then(response => console.log(response))
  .then(data => {
    const arrayElem = data.d
    console.log(arrayElem);
    arrayElem.map((elememt) => {
      const imag = elememt.i.imageUrl
      const name = elememt.l
      const person = elememt.s
      const year = elememt.y
      const rank = elememt.rank

      const poster =
        `
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 text-center">
      <div class="card my-3" style="width: 20rem; height:auto;">
        <img src="${imag}" class="card-img-top img-thumbnail" alt="" style="height:auto; width:auto;">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${person}</p>
          <p class="card-text">${rank}</p>
          <p class="card-text">${year}</p>
        </div>
      </div> <!--Aqui termina el card-->
  
    </div>
      `
      document.getElementById("movies").innerHTML += poster
    })
  })


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