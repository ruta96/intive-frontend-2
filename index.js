import moviesStorage from './movies-storage.js';
import moviesCounterSet from './movies-counter.js';

let watchStatus;
const moviesCounterAll = document.getElementById("moviesCounterAll");
const moviesCounterSeen = document.getElementById("moviesCounterSeen");
const movies = new moviesStorage();

moviesCounterSet(moviesCounterAll, movies.get().length);
moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);


movies.moviesList.forEach((elem, index) => {
    //initial class assigment for seen and not seen movies
    if (elem.seen === "T"){ 
        watchStatus = "seen";
    }
    else{ 
        watchStatus ="not-seen";
    }
    //template of single list element
    const li = document.createElement("li");
    li.className = "listElement";
    li.innerHTML = (`
    <h1>${elem.title} (${elem.year})</h1>
    <div class="${watchStatus}" id="${index}"></div>
    <h2 class="genre">${elem.genre}</h2>
    <hr>
    <p>${elem.summary}</p>
    `);
    document.getElementById('moviesList').appendChild(li);
});

//handle onclick
//change status img and value in table at key seen
for(let i = 0; i<movies.moviesList.length; i++){
    document.getElementById(i).addEventListener('click',function () {
        if (this.className === "seen"){
            movies.moviesList[this.id].seen = "F";
            this.className ="not-seen";
        }
        else {
            movies.moviesList[this.id].seen = "T";
            this.className = "seen";
        }
    moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);
    })
}