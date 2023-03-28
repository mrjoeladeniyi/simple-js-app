// using IIFE to create a self-executing function()
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    // pokemonList.push(pokemon);

    // working on checking the condition of typeof object
    // typeof pokemon === 'object';
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
      //&& "detailsUrl" in pokemon
      //&& "height" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    appEventListener(pokemon);
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(
        "Name:" + pokemon.name,
        "Height:" + pokemon.height,
        pokemon.imageUrl
      );
    });
  }

  function showModal(title, text, image) {
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalClose = document.createElement("button");
    modalClose.classList.add("modal-close");
    modalClose.innerText = "Close";
    modalClose.addEventListener("click", hideModal);

    let nameElement = document.createElement("h1");
    nameElement.innerText = title;

    let heightElement = document.createElement("p");
    heightElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = image;

    modal.appendChild(modalClose);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", function (e) {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // added evenListner to condition & interact with DOM
  function appEventListener(pokemon) {
    let listOfPokemons = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("pokemon-button");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listOfPokemons.appendChild(listItem);
    listItem.appendChild(button);

    if (pokemon.height > 1.5) {
      button.innerText = pokemon.name + "\n" + "Wow! that's big";
    } else {
      button.innerText = pokemon.name;
    }
  }

  function loadList() {
    //showLoadingMessage()

    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function loadDetails(item) {
    //showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.type;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // this function shows a loading message while waiting for the pokémon list to load
  function showLoadingMessage() {
    let loadingMessageContainer = document.createElement("div");
    let message = document.createElement("p");
    loadingMessageContainer.classList.add("loading-message-container");
    message.classList.add("message");
    message.innerText = "Pokémon Loading...";

    loadingMessageContainer.appendChild(message);

    //window.alert("Pokémon Loading...")
  }

  function hideLoadingMessage() {
    let loadingMessageContainer = document.createElement("div");
    let message = document.createElement("p");
    loadingMessageContainer.classList.add("loading-message-container");
    message.classList.add("message");
    message.innerText = "Pokémon Loading...";

    loadingMessageContainer.removeChild(message);
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    appEventListener: appEventListener,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// create new variable with the function pokemonRepository
let pokemonList = pokemonRepository.getAll();

// loop through each item in pokemonList array forEach function
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// testing if the new function logs to console
console.log(pokemonRepository.getAll());
console.log(pokemonList.length);
