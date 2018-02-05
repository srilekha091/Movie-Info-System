//Creating an event when the form is submitted.
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => { //having a callback in form of arrow function.
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    //Make a request to the URL.
           axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
            .then(function (response) {
                var movies = response.data.results;
                console.log(response);
                var output = '';
                $.each(movies, function (index, movie) {
                    output += '<div class="col-md-3">';
                    //The .well class adds a rounded border around an element with a gray background color and some padding
                    output += '<div class="well text-center">';
                    output += '<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"> ';
                    output += '<h5>' + movie.title + '</h5>';
                    output += '<a onclick="movieSelected(' + movie.id + ' class="btn btn-primary" href="#")>Movie Details</a>';
                    output += '</div>';
                    output += '</div>';
                });

                $('#movies').html(output);
            })

    .catch(function (error) {
        console.log(error);
        console.log('something is going wrong');
    });
}


function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId)
      .then((response) => {
          console.log(response);
          let movie = response.results;

          let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

          $('#movie').html(output);
      })
      .catch((err) => {
          console.log(err);
      });
}