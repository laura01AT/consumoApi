/*Valores de los parametros que se usaran en la funcion fetch
  consultamos solo los webtoon provinientes del provedor "surya"
  consultamos solo 12 objetos
  pagina de la api https://rapidapi.com/tigaron/api/manga-scrapper/
*/
const urlApi = 'https://manga-scrapper.p.rapidapi.com/webtoons?provider=surya&page=1&limit=12';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dc1508ea00msh08a2bda95c26bbdp1a5051jsnc109724ebe2e',
		'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
	}
};
/*Funcion getData(), consume la api, transforma los datos en json
leaplica la funcion creteCards()*/
function getData(){
  let promesa = fetch(urlApi,options)
    .then(response => response.json())
    .then(json => createCards(json));
}

/*Funcion que crea las tarjetas que se mostraran en el html
crea una tarjeta por objeto en el json, entonces crea 12 tarjetas*/
function createCards(json){
  const cards = document.getElementById("cards");
  let cardContent = "";
  json.forEach(webtoon => {
    cardContent += `
    <div class="card py-3" style="width: 18rem;">
      <img src="${webtoon.coverURL}" class="card-img-top" alt="..."><!--Se agrega el coverURL-->
      <div class="card-body">
        <h5 class="card-title">${webtoon.title}</h5>
        <p class="card-text overflow-y-hidden">${webtoon.synopsis}</p>
      </div>
        <h5 class="text-center">Generos</h5>
      <ul class="list-group list-group-flush"> <!--intentaremos agregaar los generos-->
        <li class="list-group-item">${webtoon.genre[0]}</li>
        <li class="list-group-item">${webtoon.genre[1]}</li>
        <li class="list-group-item">${webtoon.genre[2]}</li>
      </ul>
      <div class="card-body">
        <a href="${webtoon.shortURL}" class="card-link">Leer ahora</a>
      </div>
    </div>
    `
  });
  //console.log(cardContent);
  cards.innerHTML = cardContent;
  document.getElementById("preloader").style.display = "none";
}

//Se ejecuta la funcion principal
getData();
// >>>>>>>>>>>>>>>>>>>> Comentarios <<<<<<<<<<<<<<<<<<<<<<<<<<<<

const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');
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
