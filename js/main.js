$(document).ready(() => {
    $('#search_form').on('submit', (e) => {
        let search_text = ($('#search_text').val());
        console.log(($('#search_text').val()));
        get_movies(search_text);
        e.preventDefault();
    });
});

function get_movies(search_text) {
    axios.get('http://www.omdbapi.com/?s=' + search_text + '&apikey=e618da30')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search; //throw search array to varible movies.
            let output = '';
            $.each(movies, (index, movie) => { //get movie array. index the data called movie(in api-->"Type":"movie")
                output += `                  
                <div class = "col-md-3">  
                    <div class="well text-center">
                        <img src="${movie.Poster}"></img>
                        <h4>${movie.Title}</h4>
                        <a onclick="movie_selected('${movie.imdbID}')" class="btn btn-primary" style="margin-bottom: 30px;" href="#">Movie Details</a>
                    </div>
                </div>
                `;
            });

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

function movie_selected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function get_movie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=e618da30')
        .then((response) => {
            let movie = response.data;
            let output = `
            <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h1 style="color:white;">${movie.Title}</h1>
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
            <div class="well" style="margin-left:400px;color:white;">
            
              <h4>Plot</h4>
              <div style="border-style: solid; border-width: 3px;border-color:white; padding:5px;">
              ${movie.Plot}
              </div>
             
              <div style="margin-top:15px;">
                <div style="margin-left:350px; display:inline-block;">
                     <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" >View IMDB</a>
                         <div style="margin-left:50px;display:inline-block;">
                            <a href="index.html" class="btn btn-primary">Go Back To Search</a>
                </div>
            </div>
              </div>
            </div>
          </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}