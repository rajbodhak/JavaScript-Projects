'use strict';

const movieCard = document.querySelector('.movieCard');
const searchBtn = document.querySelector('#search');
const movieName = document.querySelector('#movieName');
const moviePoster = document.querySelector('#moviePoster');
const releaseDate = document.querySelector('#release_date');
const overView = document.querySelector('#overview');
const movieHeading = document.querySelector('.movieHeading');

//function to Convert Perfect Movie name for API
const perfectName = function(movie) {
    let name = movie.toLowerCase();
    let newName = name.replace(/ /g, '+');
    return newName;    
}


//Function to convert Date format
function convertDateFormat(dateString) {
    const dateParts = dateString.split("-");
    // Rearrange the parts to DD-MM-YYYY format
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return formattedDate;
}

//Function for event Handler
const handleSearch = (event) => {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
        movieName.textContent = "";
        fetchData();
    }
};

//Events
searchBtn.addEventListener('click', handleSearch);
movieName.addEventListener('keydown', handleSearch);


//FetchData function to take Data from API
async function fetchData() {

    const apiKey = 'f7de335ebcc6816a67178f2a4008581f'; 
    const movie = movieName.value;
    const convertMovieName = perfectName(movie);

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`);

        if(!response.ok) {
            throw new Error('Could not fetch resources');
        }

        const data = await response.json();
        console.log(data);

        if (data.results && data.results.length > 0) {

            const heading = data.results[0].title;
            movieHeading.innerHTML = heading;

            const poster = data.results[0].poster_path;
            const fullPosterUrl = `https://image.tmdb.org/t/p/w500${poster}`;

            moviePoster.src = fullPosterUrl;
            moviePoster.style.display = 'block';

            const date = data.results[0].release_date;
            const newDate = convertDateFormat(date);
            releaseDate.innerHTML = `<span class="detailsSpan">Release Date: </span> ${newDate}`;
            console.log(newDate);

            const description = data.results[0].overview;
            overView.innerHTML = `<span class="detailsSpan">Overview: </span> ${description}`;
            console.log(description);

        } else {
            console.log('No results found.');
        }
        
    }

    catch(error){
        console.error(error);
    }
}