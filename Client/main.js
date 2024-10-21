// On page load




const drawMovieRows = (data) => {
    if(!data){
        return;
    }

    let markup = '';

    
    /*
        budget
        country
        director
        distributor
        id
        language
        music
        page
        producer
        released
        runtime
        starring
        title
        writer
    */

    /*
        <tr>
            <td>${row.title}</td>
            <td>${row.budget}</td>
            <td>${row.country}</td>
            <td>${row.director}</td>
            <td>${row.distributor}</td>
            <td>${row.language}</td>
            <td>${row.music}</td>
            <td>${row.producer}</td>
            <td>${row.released}</td>
            <td>${row.runtime}</td>
            <td>${row.starring}</td>
            <td>${row.writer}</td>
        </tr>
    */


    data.forEach( (row) => {
        markup = markup + `
        
        <div class="card" style="width: 18rem;">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">

            <div class="card-body">
                <h5 class="card-title">${row.title}</h5>
                <p class="card-text">
                    Budget: ${row.budget} <br />
                    Country: ${row.budget}<br />
                </p> 
            </div>
        </div>
        `;
    });

    $('#movie-list').html(markup);
 
}
const handleMovie = (data, status) => {
    console.log(data, status);
    drawMovieRows(data.movieList);
}


function performSearch() {
    $.get('/movie_ajax?search_value=' + document.getElementById('search_text').value, (data) => {
        drawMovieRows(data.movieList);
    }, 'json');
}

$( document ).ready(function() {
    console.log( "ready!" );

    $.get('/movie', handleMovie, 'json');

});



// let table = new DataTable('#movie-container', {
//     ajax:'/movie_ajax',
//     processing: true,
//     serverSide: true
// });


