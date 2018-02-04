// global variables
 var movies = [];
 var movie = '';
 var list = document.querySelector('tbody');
 var bookmarkBar = document.querySelector('.title');
 var searchField = document.querySelector('input');
 var bookmark = ["Batman", "Superman", "Iron man"];
//  var bookmark = [];
//  localStorage.setItem('bookmark', JSON.stringify(bookmark));
 
// on page load retrieve bookmark array from localStorage and show bookmark bar 
// if user is first time on page, set default bookmark bar
 $( document ).ready(function() {
    if(typeof bookmark !== null) {
    var retrievedObject = localStorage.getItem('bookmark');
    bookmark = JSON.parse(retrievedObject);
    updateBookmark(bookmark);  
} else {
    updateBookmark(bookmark);  
}

});

// save to localStorage updated bookmark array, add new bookmark to bookmark bar
function updateBookmark(bookmark) {
        localStorage.setItem('bookmark', JSON.stringify(bookmark));
        bookmark.forEach((element,index) => {
        var html = `<button type="button" data-name="${element}" data-do="show" class="btn btn-default">${element}
        </button>
        <button type="button" data-do="remove" data-id="${index}" class="btn btn-default">
        <span class="glyphicon glyphicon-remove"></span>
        </button>`;
        bookmarkBar.insertAdjacentHTML('beforeend', html);
        
    });
}
    

// main function for getting data, adding to list and sorting
function getMovieList(title, type, axis) {
    movies = [];
    var movie = title;
    const API = '9677b7f1';
    var url =`http://www.omdbapi.com/?type=movie&s=${title}&apikey=${API}`;
    $.getJSON(url, function (data) {
        data.Search.forEach(element => {
            movies.push(element);
        });  
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
    $(".list").empty();
    movies.forEach(element => {
        var html = ` <tr>
        <td><img src="${element.Poster}" alt="${element.Title}"></td>
        <td>${element.Title}</td>
        <td>${element.Year}</td>
      </tr>`;
        list.insertAdjacentHTML('beforeend', html)
    });
}

// Event handler for movies filtering and removal from bookmark bar

$( ".title" ).click(function(event) {
    $('.filter .active').removeClass('active');
    $('.title .active').removeClass('active');
    if(event.target.dataset.do === "show"){
        $( event.target ).addClass('active');
        movie = event.target.dataset.name;
        getMovieList(movie);
    }else if(event.target.dataset.do === "remove"){
        bookmark.splice(event.target.dataset.id, 1);
        $(".title").empty();
        updateBookmark(bookmark);
    }
   
   
});

// Event handler for sorting by title/year || asc/desc

$( ".filter" ).on( "click", function(e) { 
    $('.filter .active').removeClass('active');   
    $(e.target).addClass('active');
    var byaxis = e.target.dataset.axis;
    var bytype = e.target.dataset.type;
    getMovieList(movie, bytype, byaxis);
   
});

// event when search button is clicked
$( ".search" ).on( "click", function() { 
    if(searchField.value !== ""){ 
        $('.filter .active').removeClass('active');
        $('.title .active').removeClass('active');
        $(".list").empty();
        movie = searchField.value;
        getMovieList(movie);
        searchField.value = "";       
    }else  return;
    
 
});

// adds search result to bookmarks bar
$( ".btn-bookmark" ).mousedown(function() { 
    if(movie !==""){
        bookmark.push(movie);
        $(".title").empty();
        updateBookmark(bookmark);
    }else return; 
});

// search on ENTER keypress only when input is focused
 $(".form-control").keypress(function (event) {
    if ($(".form-control:focus") && (event.keyCode === 13)) {
        $('.filter .active').removeClass('active');
        $('.title .active').removeClass('active');
        $(".list").empty();
        movie = searchField.value;
        getMovieList(movie);
        searchField.value = "";
    }else return;
});








