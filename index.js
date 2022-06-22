let form = document.querySelector('form')
let div = document.querySelector('#pokemonStats')
let pokeSpecies = document.querySelector('#name')
let pokeSprites = document.querySelector('#sprites')
let pokeTypes = document.querySelector('#types')
let abilityList = document.querySelector('#abilityList')
let pokeStats = document.querySelector('#stats')
let pokeMoves = document.querySelector('#moves')
let backSprite = document.querySelector('#back_sprite')
let frontSprite = document.querySelector('#front_sprite')


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    removeAllChildNodes(pokeTypes)
    removeAllChildNodes(abilityList)
    removeAllChildNodes(pokeStats)
    removeAllChildNodes(pokeMoves)
    let pokemon = e.target.pokemonName.value.toLowerCase()
    pokeSpecies.textContent = e.target.pokemonName.value.toUpperCase()
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(resp => resp.json())
    .then(pokemon => {
    // console.log(pokemon)
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
        // console.log(abilityObj.ability.name)
        let pokeAbility = document.createElement('li')
        pokeAbility.textContent = abilityObj.ability.name
        abilityList.appendChild(pokeAbility)
    });
    // Pokemon Stats
    pokemon.stats.forEach(statObj => {
        // console.log(statObj.base_stat)
        // console.log(statObj.stat.name)
        let statsData = document.createElement('td')
        statsData.textContent = statObj.base_stat
        pokeStats.append(statsData)
    });

     })
     .catch(e => alert(e))
    form.reset()
    })


let resetBtn = document.querySelector('button')
resetBtn.addEventListener('click', () => {
    pokeSpecies.textContent = 'Pokédex'
    backSprite.src = './pokedex.png'
    frontSprite.src = './ash.png'
    removeAllChildNodes(pokeTypes)
    removeAllChildNodes(abilityList)
    removeAllChildNodes(pokeStats)
    removeAllChildNodes(pokeMoves)
})

function hideAllAttributes(){
    let div = document.querySelectorAll('.selectList'), i;
    let table = document.querySelector('#pokeTable')
    table.style.display = 'none'
    for (i = 0; i < div.length; i++) {
        div[i].style.display = "none";
    }
}

function showAllAttributes(){
    let div = document.querySelectorAll('.selectList'), i;
    let table = document.querySelector('#pokeTable')
    table.style.display = ''
    for (i = 0; i < div.length; i++) {
        div[i].style.display = "block";
    }
    
}

let select = document.querySelector('select')
select.addEventListener('change', (event) => {
    console.log(event.target.value)
    let value = event.target.value
    let abilities = document.querySelector('#abilities')
    let type = document.querySelector('#pokeTypes')
    let stats = document.querySelector('#pokeStats')
    let table = document.querySelector('#pokeTable')
    let moves = document.querySelector('#pokeMoves')
    if(value === 'allStats'){
        showAllAttributes()
    }
    else if(value === 'type'){
        hideAllAttributes()
        pokeTypes.style.display = 'block'
        type.style.display = 'block'   
    }
    else if(value === 'ability'){
        hideAllAttributes()
        abilities.style.display = 'block'
        abilityList.style.display = 'block'
    }
    else if(value === 'stat'){
        hideAllAttributes()
        stats.style.display = 'block'
        table.style.display = ''
    }
    else if(value === 'move'){
        hideAllAttributes()
        moves.style.display = 'block'
        pokeMoves.style.display = 'block'
    }
})

let randomButton = document.querySelector("#random-button")

randomButton.addEventListener("click", () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
    .then(resp => resp.json())
    .then(pokemon => {
        let pokemonObj = pokemon.results
        let randomPokemon = pokemonObj[Math.floor(Math.random()*pokemonObj.length)];
        let randomPokemonName = document.querySelector("#random-pokemon-name")
        randomPokemonName.innerText = randomPokemon.name;
            
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`)
        .then(response => response.json())
        .then(randomPokemon => {
            let randomFrontSprite = document.querySelector("#random-front-sprite");
            let randomBackSprite = document.querySelector("#random-back-sprite");
            randomFrontSprite.src = randomPokemon.sprites.front_default;
            randomBackSprite.src = randomPokemon.sprites.back_default;
        });
    });
});

