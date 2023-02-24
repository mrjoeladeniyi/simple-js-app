
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
    }

    function getAll() {
        return pokemonList;
    }

    return{
        add: add,
        getAll: getAll
    };

})();

// create new variable with the function pokemonRepository
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function(pokemon) {
    // document.write("<h2>" + pokemon.name + "</h2>" + "height:" + pokemon.height + "<br>");
    if (pokemon.height > 1.5){
        document.write("<h2>" + pokemon.name + "</h2>" + pokemon.height + "<br>" + "Wow, that's big!")
    }else{
        document.write("<h2>" + pokemon.name + "</h2>" + " height:" + pokemon.height + "<br>");
    }
});

// testing if the new function logs to console
console.log(pokemonRepository.getAll());