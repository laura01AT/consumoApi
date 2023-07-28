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


addEventListener("submit", function(event){
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;

    const nuevoComentario = {
        name: name,
        pass: pass
    };

    let comentarios = JSON.parse(this.localStorage.getItem("comenarios"));

    comentarios.push(nuevoComentario);

    this.localStorage.setItem("comentarios", JSON.stringify(comentarios));

    mostrarComentarios();
})










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