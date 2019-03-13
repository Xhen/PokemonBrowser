$(document).ready(() => {
    
    let state = {
        index: 1
    }
    
    // Returns HTML with the character information
    // {id, name, status, species, gender}
    const createTemplate = (character) => {
        return(`
        <div class="character">
            <img id="front" class="showoff-character" src="${character.sprites.front_default}" width="300" height="300">
            <img id="back" class="showoff-character hidden" src="${character.sprites.back_default}" width="300" height="300">
            <h4 class="character--name">${character.species.name}</h4>
            <p class="character--p">ID: <span>${character.id}</span></p>
            <p class="character--p">Abilities: <span>${character.abilities[0].ability.name}, ${character.abilities[1].ability.name}</span></p>
            <p class="character--p">Type: <span>${character.types[0].type.name}</span></p>
            <p class="character--p">Weight: <span>${character.weight}</span></p>
        </div>
        `);
    }

    const changeBackground = (character) => {
        let typeColors = {
            'poison': 'limegreen',
            'grass': 'darkgreen',
            'fire': 'tomato',
            'flying': 'lightblue',
            'water': 'cornflowerblue',
            'bug': 'lime',
            'normal': 'orange',
            'electric': 'yellow',
            'ground': 'olive',
            'fairy': 'hotpink',
            'fighting': 'burlywood',
            'ghost': 'purple',
            'ice': 'DeepSkyBlue',
            'steel': 'gray',
            'dragon': 'blueviolet',
            'psychic': 'crimson'

        }
        let color = typeColors[character.types[0].type.name];
        $('.wrap').css('background-image', `linear-gradient(white, ${color})`); 
    }

    
    // Get JSON from API
    // Index default value is 1
    const getAndInsertCharacter = (index = 1) => {
        $.get(`https://pokeapi.co/api/v2/pokemon/${state.index}`, (data, status) => {
            let charTemplate = createTemplate(data);
            $('.character-wrap').html(charTemplate);
            changeBackground(data);
        });
    }

    const fetchNew = (number) => {
        state.index += number;
        getAndInsertCharacter();
    }

    const spinCharacter = () => {
        $('#front').toggleClass('hidden');
        $('#back').toggleClass('hidden');
    }

    $('#next').click(() => {
        fetchNew(1);
    });

    $('#prev').click(() => {
        fetchNew(-1);
    });

    $('body').keydown((e) => {
        // Right arrow
        if(e.keyCode == 39) {
            fetchNew(1);
        // Left arrow
        } else if(e.keyCode == 37) {
            fetchNew(-1);
        } else if(e.keyCode == 38 || e.keyCode == 40) {
            spinCharacter();
        }
    });

    $("#spin").click(() => {
        spinCharacter();
    });

    $(".info-close").click(() => {
        $('.info').remove();
    });

    // Init
    getAndInsertCharacter();
})