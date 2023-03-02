
// using IIFE to create a self-executing function()
let pokemonRepository = (function() {

    let pokemonList = [
    {name: 'Charizard', type: ['fire', 'flying' ], height: 1.7},
    {name: 'Nidoking', type: ['ground', 'poison'], height: 1.4},
    {name: 'Golem', type:['ground', 'rock'], height: 1.4},
    {name: 'Fearow', type:['flying', 'normal'], height: 1.2},
    ]

    function add(pokemon) {
        pokemonList.push(pokemon);

        // working on checking the condition of typeof object
        // typeof pokemon === 'object';
        /*
        if (typeof pokemonInput === 'object') {
            return (pokemon + ' is not an object');
        }else{
            pokemonInput;
            console.log(typeof pokemon);
        }
        */
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        appEventListener(pokemon);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    // added evenListner to condition
    function appEventListener(pokemon){
        let listOfPokemons = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.classList.add('pokemon-button');
        button.addEventListener('click', function(){
                showDetails(pokemon);
            });
        listOfPokemons.appendChild(listItem);
        listItem.appendChild(button);

        if (pokemon.height > 1.5){
            button.innerText = pokemon.name + "\n" + "Wow! that's big";
        }else{
            button.innerText = pokemon.name;
        }
    }

    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        appEventListener: appEventListener
    };

})();

pokemonRepository.add({name: 'Joel', type: ['fire'], height: 2.0})

// create new variable with the function pokemonRepository
let pokemonList = pokemonRepository.getAll();

// loop function forEach item in pokemonList array
pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
});

// testing if the new function logs to console
console.log(pokemonRepository.getAll());


let checkType = typeof(value);



console.log(pokemonList.length)