const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")

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
    <img src="${pokemon.sprites.front_default}" alt="imagen del ${pokemon.name}">
    <h3>${pokemon.name}</>
    <p> ID: ${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}
function showPokemonDetail(pokemon){
    pokemonList.style.display = "none"
    pokemonDetail.style.display ="block"
    document.body.classList.add('pokemon-detail-open');
    let types = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        types += pokemon.types[i].type.name;  
        if (i < pokemon.types.length - 1) {
            types += ', '; 
        }
    }
    
    pokemonInfo.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <p><strong>Types:</strong> ${types}</p>
    `
}
async function loadPokedex() {
    for (let i=1;i<1500;i++){
    let pokemon = await getPokemonData(i)
    displayPokemon(pokemon)
}
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.display = "grid"
    pokemonDetail.style.display ="none"
    document.body.classList.remove('pokemon-detail-open');
})
loadPokedex()