
// using IIFE to create a self-executing function()
let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        // pokemonList.push(pokemon);

        // working on checking the condition of typeof object
        // typeof pokemon === 'object';
        if (
            typeof pokemon === "object"
            && "name" in pokemon
            //&& "detailsUrl" in pokemon
            //&& "height" in pokemon
        ) {
        pokemonList.push(pokemon);
        }else{
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        appEventListener(pokemon);
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
        });
    }

    // added evenListner to condition & interact with DOM
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

    // TASK: testing delaying the load screen for 3 seconds
    /*
    function delayLoadList() {
        let delayedLoadList = new Promise(function(){
            setTimeout(function() {
                return fetch(apiUrl);
            }, 3000);
        });
        return delayedLoadList;
    }
    */

    function loadList() {
        showLoadingMessage()

        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name : item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function(error){
            console.error(error);
        })
    }

    function loadDetails(item) {
        showLoadingMessage()
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.type;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showLoadingMessage() {
        let loadingMessageContainer = document.querySelector('.loading-message-container');
        let message = document.createElement('p');
        message.classList.add('message');

        loadingMessageContainer.appendChild(message);
        message.innerText = "Pokémon Loading..."
        //window.alert("Pokémon Loading...")
    }

    function hideLoadingMessage() {

    }

    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        appEventListener: appEventListener,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        //delayLoadList: delayLoadList
    };

})();

// create new variable with the function pokemonRepository
let pokemonList = pokemonRepository.getAll();

// loop function forEach item in pokemonList array
pokemonRepository.loadList().then(function() {
    pokemonList.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
})


// testing if the new function logs to console
console.log(pokemonRepository.getAll());
console.log(pokemonList.length)