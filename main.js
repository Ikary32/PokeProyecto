const pokemonlist = document.getElementById("pokemonList")

async function getPokemonData(pokemonID){
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    let pokemon = await res.json()
    return pokemon
        
    } catch (error) {
        console.error(error.message)
        return null
    }
    
}
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</>
    <p> ID: ${pokemon.id}</p>
    `
    
    pokemonlist.appendChild(pokemonCard)
}
async function loadPokedex() {
    for (let i=1;i<100;i++){
    let pokemon = await getPokemonData(i)
    displayPokemon(pokemon)
    console.log(pokemon)
}
}
loadPokedex()