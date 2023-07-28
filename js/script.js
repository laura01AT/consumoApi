//Funciones para la seccion comentarios
// Obtener el formulario y el div donde se mostrarán los comentarios
const comentarioForm = document.getElementById('comentarioForm');
const comentariosDiv = document.getElementById('comentarios');

// Manejar el evento de envío del formulario
comentarioForm.addEventListener('submit', function (event) {
  //event.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores ingresados por el usuario
  const nombre = document.getElementById('nombre').value;
  const comentario = document.getElementById('comentario').value;

  // Crear un objeto para representar el comentario
  const nuevoComentario = {
    nombre: nombre,
    comentario: comentario
  };
  // Obtener los comentarios existentes en Local Storage
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  // Agregar el nuevo comentario al arreglo de comentarios
  comentarios.push(nuevoComentario);

  // Guardar los comentarios actualizados en Local Storage
  localStorage.setItem('comentarios', JSON.stringify(comentarios));

  // Actualizar la visualización de los comentarios en la página
  mostrarComentarios();

  // Limpiar el formulario
  comentarioFormreset();
});
// Función para mostrar los comentarios en la página
function mostrarComentarios() {
  comentariosDiv.innerHTML = ''; // Limpiar el div de comentarios

  // Obtener los comentarios de Local Storage
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  // Mostrar cada comentario en el div
  comentarios.forEach(comentario => {
    const comentarioHTML = `
      <div>
        <h3>${comentario.nombre}</h3>
        <p>${comentario.comentario}</p>
      </div>
    `;
    comentariosDiv.insertAdjacentHTML('beforeend', comentarioHTML);
  });
}

// Mostrar los comentarios al cargar la página
mostrarComentarios();