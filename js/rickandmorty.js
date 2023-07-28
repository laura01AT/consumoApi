const API_URL = "https://rickandmortyapi.com/api/character";

fetch(API_URL)
    .then(response => response.json())
    //.then(response => console.log(response));
    .then(data => {
        const arrayCap = data.results
        console.log(arrayCap);
        arrayCap.map((element) => {
            const id = element.id
            const title = element.name
            const image = element.image
            const gender = element.gender
            const create = element.created

            const poster =
                `
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 py-4 text-center">
                <div class="card" style="width: 23rem; height:auto;">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <h5 class="card-title">El id del personaje es: ${id}</h5>
                        <p class="card-text">Su genero es: ${gender}</p>
                        <p class="card-text">Se creo en: ${create}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById('app').innerHTML += poster
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










// //const API_URL = "https://jsonplaceholder.typicode.com";
// const options = {method: 'GET', Headers: {accept: 'application/json'}}
// const HTMLResponse = document.getElementById("app");

// fetch('https://themoviedb.org/3/aunthentication', options)
//     .then(response => response.json())
//     .then(response=> console.log(response))
//     .catch(err=>console.error(err));

// // fetch(`${API_URL}/users`)
// //     .then(response => response.json())
// //     .then(users=> {
// //         const tlp = users.map((user)=>`<li>${user.name} - ${user.email}</li>`);
// //         HTMLResponse.innerHTML = `<ul>${tlp}</ul`
// // })
// // 	.catch(error=>{
// // 	console.log(error);
// // });