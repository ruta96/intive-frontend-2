import moviesCounterSet from './movies-counter.js';
import moviesStorage from './movies-storage.js';

const moviesCounterAll = document.getElementById("anotherMoviesCounterAll");
const moviesCounterSeen = document.getElementById("anotherMoviesCounterSeen");
const movies = new moviesStorage();

const setCounters = () =>{
    moviesCounterSet(moviesCounterAll, movies.get().length);
    moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);
};
setCounters();

const validate = (input,text) => {
    document.getElementById(input).classList.add("validate");
    document.getElementById("message").innerText = text;
};

const clear = (input) => {
    document.getElementById(input).classList.remove("validate");
    document.getElementById("message").innerText="";
};

//clear error message after changing
Array.prototype.forEach.call(document.getElementsByClassName("input-text"), function(el) {
    document.getElementById(el.id).addEventListener("change", function(){
        clear(el.id)
    });
});


const title = document.getElementById('title');
const year = document.getElementById('year');
const genre = document.getElementById('genre');
const summary = document.getElementById('summary');
let seen;

//handle onclick for add movie
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
    };

    if(title.value === ""){
        validate("title","Title must be filled out");
        return false;
    }
    if(year.value === ""){
        validate("year","Year must be filled out");
        return false;
    }
    if(genre.value === ""){
        validate("genre","Genre must be filled out");
        return false;
    }
    if(!/^[1-9][0-9][0-9][0-9]$/.test(year.value)){
        validate("year","Year must be four digits long");
        return false;
    }
    if(movies.moviesList.find( elem => elem.title === title.value)){
        validate("title","This movie is already added to list");
        return false;
    }
    if(data.summary === ""){
        data.summary = "No summary.";
    }

    movies.set(data);
    setCounters();
    document.getElementById('addmovie-form').reset();
});
document.getElementById("return-button").addEventListener('click',function () { location.href="./"});