interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

const pokemonListContainer = document.getElementById("pokemon-list") as HTMLElement;
const pokemonDetailContainer = document.getElementById("pokemon-detail") as HTMLElement;
const detailContent = document.getElementById("detail-content") as HTMLElement;
const backButton = document.getElementById("back-button") as HTMLButtonElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchButton = document.getElementById("search-button") as HTMLButtonElement;


// Fetch Pokémon List
async function fetchPokemonList(limit: number = 10): Promise<Pokemon[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    // Map data ke format Pokemon[]
    const pokemonPromises = data.results.map(async (pokemon: any, index: number) => {
        const pokemonDetail = await fetch(pokemon.url).then((res) => res.json());
        return {
            id: pokemonDetail.id,
            name: pokemonDetail.name,
            image: pokemonDetail.sprites.front_default,
            types: pokemonDetail.types.map((t: any) => t.type.name),
        };
    });

    return Promise.all(pokemonPromises);
}

// Render Pokémon List
function renderPokemonList(pokemonList: Pokemon[]) {
    pokemonListContainer.innerHTML = ""; // Clear container
    pokemonList.forEach((pokemon) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p>#${pokemon.id}</p>
        `;
        card.addEventListener("click", () => showPokemonDetail(pokemon));
        pokemonListContainer.appendChild(card);
    });
}

// Show Pokémon Detail
function showPokemonDetail(pokemon: Pokemon) {
    pokemonListContainer.classList.add("hidden");
    pokemonDetailContainer.classList.remove("hidden");

    detailContent.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>Type: ${pokemon.types.join(", ")}</p>
    `;
}

// Back Button Logic
backButton.addEventListener("click", () => {
    pokemonDetailContainer.classList.add("hidden");
    pokemonListContainer.classList.remove("hidden");
});

// Initialize App
async function init() {
    const pokemonList = await fetchPokemonList(20); // Ambil 20 Pokémon pertama
    renderPokemonList(pokemonList);
}

async function searchPokemon(query: string): Promise<Pokemon[]> {
    if (!query) return await fetchPokemonList(20); // Jika query kosong, kembalikan daftar Pokémon awal.

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (response.ok) {
        const pokemonDetail = await response.json();
        return [{
            id: pokemonDetail.id,
            name: pokemonDetail.name,
            image: pokemonDetail.sprites.front_default,
            types: pokemonDetail.types.map((t: any) => t.type.name),
        }];
    } else {
        alert("Pokémon not found");
        return []; // Jika Pokémon tidak ditemukan
    }
}

// Event listener untuk tombol pencarian
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    const pokemonList = await searchPokemon(query); // Ambil Pokémon berdasarkan query
    renderPokemonList(pokemonList); // Render hasil pencarian
});

// Event listener untuk menangani input ketika menekan Enter
searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();
        const pokemonList = await searchPokemon(query); // Ambil Pokémon berdasarkan query
        renderPokemonList(pokemonList); // Render hasil pencarian
    }
});

// Ambil elemen header untuk "Pokedex"
const pokedexTitle = document.getElementById("pokedex-title") as HTMLElement;

// Fungsi untuk kembali ke tampilan home
function goback() {
    // Menyembunyikan detail Pokémon dan menampilkan daftar Pokémon
    pokemonDetailContainer.classList.add("hidden");
    pokemonListContainer.classList.remove("hidden");
}

// Event listener untuk mengembalikan ke tampilan home saat judul "Pokedex" diklik
pokedexTitle.addEventListener("click", goback);


init();
