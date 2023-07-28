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
  .then (data => {
    const arrayElem = data.d
    console.log(arrayElem);
    arrayElem.map((elememt) =>{
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