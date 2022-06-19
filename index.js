let form = document.querySelector('form')
let pokeSpecies = document.querySelector('#name')
let pokeSprites = document.querySelector('#sprites')
let pokeTypes = document.querySelector('#types')
let abilityList = document.querySelector('#abilityList')
let pokeStats = document.querySelector('#stats')
let pokeMoves = document.querySelector('#moves')
let backSprite = document.querySelector('#back_sprite')
let frontSprite = document.querySelector('#front_sprite')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let pokemon = e.target.pokemonName.value.toLowerCase()
    pokeSpecies.textContent = e.target.pokemonName.value.toUpperCase()
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(resp => resp.json())
    .then(pokemon => {
    console.log(pokemon)
    // Pokemon Sprite
    // console.log(pokemon.sprites)
    frontSprite.src = pokemon.sprites.front_default
    backSprite.src = pokemon.sprites.back_default
    // Types
    pokemon.types.forEach(typeObj=> {
        // console.log(typeObj.type.name)
        let pType = document.createElement('p')
        pType.textContent = typeObj.type.name
        pokeTypes.appendChild(pType)
    });
    
    // Pokemon Moves
    pokemon.moves.forEach(moveObj =>{
        // console.log(moveObj.move.name)
        let moveList = document.createElement('li')
        moveList.textContent = moveObj.move.name
        pokeMoves.appendChild(moveList)
        })
    // Pokemon Abilities
    pokemon.abilities.forEach(abilityObj => {
        console.log(abilityObj.ability.name)
        let pokeAbility = document.createElement('li')
        pokeAbility.textContent = abilityObj.ability.name
        abilityList.appendChild(pokeAbility)
    });
    // Pokemon Stats
    pokemon.stats.forEach(statObj => {
        console.log(statObj.base_stat)
        console.log(statObj.stat.name)
        let statsData = document.createElement('td')
        statsData.textContent = statObj.base_stat
        pokeStats.append(statsData)
    });
    
     });
    form.reset()
    })

let resetBtn = document.querySelector('button')
resetBtn.addEventListener('click', () => {
    let pokemonStats = document.querySelector('#pokemonStats')
    pokemonStats.remove()
})