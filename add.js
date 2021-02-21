import moviesCounterSet from './movies-counter.js';
import moviesStorage from './movies-storage.js';

const moviesCounterAll = document.getElementById("anotherMoviesCounterAll");
const moviesCounterSeen = document.getElementById("anotherMoviesCounterSeen");
const movies = new moviesStorage();

moviesCounterSet(moviesCounterAll, movies.get().length);
moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);

const title = document.getElementById('title');
const year = document.getElementById('year');
const genre = document.getElementById('genre');
const summary = document.getElementById('summary');
let seen;

document.getElementById("addmovie-button").addEventListener('click',function () {
    if(document.getElementById('seen').checked === true){
        seen = "T";
    }
    else{
        seen = "F";
    }
    const data = {
        "title" : title.value,
        "year" : year.value,
        "genre" : genre.value,
        "summary" : summary.value,
        "seen" : seen
    }
    if(title.value === ""){
        alert("Title must be filled out");
    }
    else if(year.value === ""){
        alert("Year must be filled out");
    }
    else if(genre.value === ""){
        alert("Genre must be filled out");
    }
    else if(!/^[1-9][0-9][0-9][0-9]$/.test(year.value)){
        alert("Year must be four digits long")
    }
    else if(movies.moviesList.find( elem => elem.title == title.value)){
        alert("This movie is already added to list");
    }
    else{
    movies.set(data);
    moviesCounterSet(moviesCounterAll, movies.get().length);
    moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);
    title.value= "";
    year.value= "";
    genre.value= "";
    summary.value= "";
    }
});