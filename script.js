const myapiKey = "982e045e";

const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {
    const url = `https://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}`;
    const response = await fetch(url);
    if (response.status==404)
    {
        console.log("Data not found");
    }
    const data = await response.json();

    showMovieData(data);

}
const showMovieData = (data) => {
    movieContainer.innerHTML= "";
    movieContainer.classList.remove('noBackground');
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title} </h2> <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element =>{
       const p=document.createElement('p');
       p.innerText=element;
       movieGenreElement.appendChild(p); 
    });
    movieElement.appendChild(movieGenreElement);
     movieElement.innerHTML += `<p><strong>Realeased Date: </strong>${Released}</p> 
                               <p><strong>Duration: </strong>${Runtime}</p> 
                               <p><strong>Cast: </strong>${Actors}</p>   
                               <p><strong>Plot: </strong>${Plot}</p>`; 
    
  
     const moviePosterElement=document.createElement('div');  
     moviePosterElement.classList.add('movie-poster');
     moviePosterElement.innerHTML = `<img src="${Poster}" />`; 
     
    movieContainer.appendChild(moviePosterElement); 
    movieContainer.appendChild(movieElement);
}
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>$(message)</h2>`;
    movieContainer.classList.add('noBackground');
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    }
    else{
        movieContainer.innerHTML=`<h2> Enter movie name to get movie information</h2>`;
        movieContainer.classList.add('noBackground');
    }
});
