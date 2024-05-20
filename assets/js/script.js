//listener al botón para la búsqueda del Pokémon
document.getElementById('fetchPokemon').addEventListener('click', () => fetchPokemon());

const fetchPokemon = async () => {
    const pokemonId = document.getElementById('pokemonId').value;
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';

    // Verificar si el ID ingresado es válido
    if (!pokemonId) {
        pokemonContainer.innerHTML = '<p>Por favor, ingrese un número.</p>';
        return;
    }

    try {
        //llamada a la API de Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        // Parsear la respuesta JSON
        const pokemon = await response.json();
        renderPokemonCard(pokemon);
    } catch (error) {
        //mostrar un mensaje de error
        pokemonContainer.innerHTML = `<p>${error.message}</p>`;
    }
};

const renderPokemonCard = (pokemon) => {
    const pokemonContainer = document.getElementById('pokemonContainer');
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = pokemon.height / 10;
    const weight = pokemon.weight / 10;

    //HTML de la tarjeta del Pokémon
    const cardHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p><strong>Tipo:</strong> ${types}</p>
            <p><strong>Altura:</strong> ${height} m</p>
            <p><strong>Peso:</strong> ${weight} kg</p>
        </div>
    `;

    // Insertar la tarjeta en el contenedor
    pokemonContainer.innerHTML = cardHTML;
};
