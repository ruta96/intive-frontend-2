export default class MoviesStorage{

    constructor(){
        //check if key movies exists in local storage if that return true - get data from it
        if (Array.isArray(JSON.parse(localStorage.getItem("movies")))) {
            this.moviesList = JSON.parse(localStorage.getItem("movies"));
        }
        //if movies dont exists in local storage - create defualt list and store it
        else {
            console.log("pushing default list to local storage...");
            this.moviesList = [
            {
                "id": 1,
                "title": "The Shawshank Redemption",
                "year": 1994,
                "genre": "drama",
                "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "seen": "T"
            },
            {
                "id": 2,
                "title": "The Godfather",
                "year": 1972,
                "genre": "crime",
                "summary": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                "seen": "T"
            },
            {
                "id": 3,
                "title": "The Dark Knight",
                "year": 2008,
                "genre": "action",
                "summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "seen": "T"
            },
            {
                "id": 5,
                "title": "12 Angry Men",
                "year": 1957,
                "genre": "drama",
                "summary": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
                "seen": "F"
            },
            {
                "id": 8,
                "title": "Schindler's List",
                "year": 1993,
                "genre": "biography",
                "summary": "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
                "seen": "F"
            },
            {
                "id": 13,
                "title": "Pulp Fiction",
                "year": 1994,
                "genre": "crime",
                "summary": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                "seen": "T"
            },
            {
                "id": 21,
                "title": "The Good, the Bad and the Ugly",
                "year": 1966,
                "genre": "western",
                "summary": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
                "seen": "F"
            }
            ];
            localStorage.setItem("movies",JSON.stringify(this.moviesList)); 
        }
    }

    get(id){
        //if function get argument - show element with id specified in arg
        if(id) return this.moviesList.find(object => object.id);
        //if no arg - show all elements in this object
        return this.moviesList;
    }

    set(data, id){
        //if set has second argument edit existing element with id specified in this argument
        if (id){
            this.moviesList.find(elem => {
                if(elem.id === id){
                    //update object element by data send by argument
                    return Object.assign(elem, data);
                    }          
            });
        }
        //if there is only one arg - add new element to list and store it
        else{
            //add id key to data
            data.id = MoviesStorage.idGenerator(this.moviesList); 
            //push element to object
            this.moviesList.push(data);
        }
        localStorage.setItem("movies",JSON.stringify(this.moviesList));
        console.log(`movie with id: ${data.id} added`);
    }

    //remove element with specified id and store changes in local storage
    remove(id){
        this.moviesList = this.moviesList.filter(elem => elem.id !== id);
        localStorage.setItem("movies",JSON.stringify(this.moviesList)); 
    }

    //create id for new element
    static idGenerator(obj){
        let id;
        if (obj.length>0){
            id = obj[obj.length-1].id + 1;
        }
        else{
            id = 1;
        }
        return id;
    }
}