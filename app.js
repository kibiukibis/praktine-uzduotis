$( document ).ready(function() {
   
});

// global variables
 var movies = [];
 var movie = '';
 var list = document.querySelector('tbody');
 

// main function for getting data
function getMovieList(title, type, axis) {
    movies = [];
    var movie = title;
    const API = '9677b7f1';
    var url =`http://www.omdbapi.com/?s=${title}&apikey=${API}`;
    $.getJSON(url, function (data) {
        data.Search.forEach(element => {
            movies.push(element);
        });  

// Invoke of sorting and showing functions
        sortList(type, axis); 
        showList(); 
 });

}  

// function to sort movies by title/year and ascending/descending
function sortList(type, axis) {

    if (type === 'year'){
        if(axis === 'asc'){
            movies.sort(function(a, b){return a.Year > b.Year})
        }else{
            movies.sort(function(a, b){return b.Year > a.Year})
        }
    }
    if (type === 'title'){
        if(axis === 'asc'){
            movies.sort(function(a, b){return a.Title > b.Title})
        }else{
            movies.sort(function(a, b){return b.Title > a.Title})
        }
    } 
}

// adding movies array elements to DOM
function showList() {
    while(list.firstChild) list.removeChild(list.firstChild);
    movies.forEach(element => {
        var html = ` <tr>
        <td>${element.Title}</td>
        <td>${element.Year}</td>
      </tr>`;
        list.insertAdjacentHTML('beforeend', html)
    });
}

// Event handler for movies filtering

$( ".title" ).on( "click", function(e) {
    $('.filter .active').removeClass('active');
    $('.title .active').removeClass('active');
    $( e.target ).addClass('active');
    movie = e.target.dataset.name;
    console.log(movie);
    getMovieList(movie);
});


// Event handler for sorting by title/year || asc/desc

$( ".filter" ).on( "click", function(e) { 
    $('.filter .active').removeClass('active');   
    $(e.target).addClass('active');
    var byaxis = e.target.dataset.axis;
    var bytype = e.target.dataset.type;
    getMovieList(movie, bytype, byaxis);
   
});
