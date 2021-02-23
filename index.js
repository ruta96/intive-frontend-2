import moviesStorage from './movies-storage.js';
import moviesCounterSet from './movies-counter.js';

let watchStatus;
const moviesCounterAll = document.getElementById("moviesCounterAll");
const moviesCounterSeen = document.getElementById("moviesCounterSeen");
const movies = new moviesStorage();

moviesCounterSet(moviesCounterAll, movies.get().length);
moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);

const addmovie = document.createElement("li");
addmovie.className = "listElement listElement-addmovie";
addmovie.id ="addmovie";
addmovie.innerText="ADD MOVIE";
document.getElementById("moviesList").appendChild(addmovie);

addmovie.addEventListener("click",function (){location.href="./add.html";})

movies.remove(22);
movies.moviesList.forEach(elem => {
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
    <div class="${watchStatus}" id="${elem.id}"></div>
    <h2 class="genre">${elem.genre}</h2>
    <hr>
    <p>${elem.summary}</p>
    `);
    document.getElementById('moviesList').appendChild(li);
});

//handle onclick
//change status img and value in table at key seen
movies.moviesList.forEach(elem => {
    document.getElementById(elem.id).addEventListener('click',function () {
        if (this.className === "seen"){
            movies.set({"seen":"F"},elem.id);
            this.className ="not-seen";
        }
        else {
            movies.set({"seen":"T"},elem.id);
            this.className = "seen";
        }
    moviesCounterSet(moviesCounterSeen, movies.get().filter(elem => elem.seen === "T").length);
    })
});