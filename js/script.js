let pokemonList = [
    {name: 'Charizard', type: ['fire', 'flying' ], height: 1.7},
    {name: 'Nidoking', type: ['ground', 'poison'], height: 1.4},
    {name: 'Golem', type:['ground', 'rock'], height: 1.4},
    {name: 'Fearow', type:['flying', 'normal'], height: 1.2},
];

// create for loop to iterate through pokemonList array and display it
for (let i=0; i < pokemonList.length; i++){
    let pokemonHeight = " ("+"height: " + pokemonList[i].height +")" + "<br>";

    // conditional statement to highlight biggest pokémon
    if (pokemonList[i].height > 1.5){
        document.write("<h2>" + pokemonList[i].name + "</h2>" + pokemonHeight + "Wow, that's big!")
    }else{
        document.write("<h2>" + pokemonList[i].name + "</h2>" + pokemonHeight)
    }
}

// Highlight favorite pokémon