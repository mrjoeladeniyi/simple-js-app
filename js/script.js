// using IIFE to create a self-executing function()
let pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  function add(pokemon) {
    // working on checking the condition of typeof object
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
      //&& "detailsUrl" in pokemon
      //&& "height" in pokemon
    ) {
      pokemonList.push(pokemon)
    } else {
      console.log('pokemon is not correct')
    }
  }

  function getAll() {
    return pokemonList
  }

  function addListItem(pokemon) {
    appEventListener(pokemon)
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon)
      showModal(pokemon)
    })
  }

  function showModal(pokemon) {
    let modalContainer = $('.modal')

    let modalBody = $('.modal-body')
    let modalDialog = $('.modal-dialog')
    let modalContent = $('.modal-content')
    let modalHeader = $('.modal-header')
    let modalTitle = $('.modal-title')
    let close = $('.close')
    let modalFooter = $('.modal-footer')

    modalTitle.empty()
    modalBody.empty()
    modalHeader.empty()

    let idElement = $('<h1>' + '#' + pokemon.id + '</h1>')
    let nameElement = $('<h1>' + pokemon.name + '</h1>')

    let divElement = $('<div></div>')

    let imageElement = $('<img class= "modal-img">')
    imageElement.attr('src', pokemon.imageUrl)

    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>')
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>')

    let itemTypeElement = $('<p>' + 'Type : ' + pokemon.type + '</p>')

    modalHeader.append(idElement)
    modalHeader.append(modalTitle)
    modalHeader.append(close)
    modalTitle.append(nameElement)
    modalBody.append(imageElement)
    divElement.append(heightElement)
    divElement.append(weightElement)
    divElement.append(itemTypeElement)
    modalBody.append(divElement)
  }

  // This function shows a list of fetched pokemon and adds evenListner
  function appEventListener(pokemon) {
    let pokemonList = $('.list-group')

    let li = $('<li></li>')
    li.addClass('list-group-item')

    let button = $('<button>').attr({
      'data-toggle': 'modal',
      'data-target': '#modal-container',
    })
    button.addClass('btn btn-lg btn-link')

    let text = document.createTextNode(pokemon.name)

    pokemonList.append(li)
    li.append(button)
    button.append(text)

    li.on('click', function () {
      showDetails(pokemon)
    })
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            weight: item.weight,
            typeOne: item.typeOne,
            typetwo: item.typeTwo,
            type: item.type,
            id: item.id,
          }
          add(pokemon)
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  function loadDetails(item) {
    let url = item.detailsUrl
    return fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default
        item.height = details.height
        item.weight = details.weight
        item.id = details.id

        dataType = details.types

        if (dataType.length > 1) {
          item.typeOne = details.types[0]['type']['name']
          item.typeTwo = details.types[1]['type']['name']
        } else {
          item.typeOne = details.types[0]['type']['name']
          item.typeTwo = ''
          item.type = item.typeOne
        }

        item.type = item.typeOne + ' ' + item.typeTwo
      })
      .catch(function (e) {
        console.error(e)
      })
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    appEventListener: appEventListener,
    loadList: loadList,
    loadDetails: loadDetails,
  }
})()

// create new variable with the function pokemonRepository
let pokemonList = pokemonRepository.getAll()

// loop through each item in pokemonList array forEach function
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
})

// testing if the new function logs to console
console.log(pokemonRepository.getAll())
console.log(pokemonList.length)
