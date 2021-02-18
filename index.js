let watchStatus;

//count seen and all movies
const countMovies = () => {
document.getElementById("moviesCounterAll").innerHTML = moviesData.length;
document.getElementById("moviesCounterSeen").innerHTML = moviesData.filter(elem => elem.seen === "T").length;
};
countMovies();

moviesData.forEach((elem, index) => {
    //initial class assigment for seen and not seen movies
    if (elem.seen === "T"){ 
        watchStatus = "seen"
    }
    else{ 
        watchStatus ="not-seen"
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
for(let i = 0; i<moviesData.length; i++){
    document.getElementById(i).addEventListener('click',function () {
        if (this.className === "seen"){
            moviesData[this.id].seen = "F";
            this.className ="not-seen";
        }
        else {
            moviesData[this.id].seen = "T";
            this.className = "seen";
        }
        countMovies();
    })
}