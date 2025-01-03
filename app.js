var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var pokemonListContainer = document.getElementById("pokemon-list");
var pokemonDetailContainer = document.getElementById("pokemon-detail");
var detailContent = document.getElementById("detail-content");
var backButton = document.getElementById("back-button");
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
// Fetch Pokémon List
function fetchPokemonList() {
    return __awaiter(this, arguments, void 0, function (limit) {
        var response, data, pokemonPromises;
        var _this = this;
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon?limit=".concat(limit))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    pokemonPromises = data.results.map(function (pokemon, index) { return __awaiter(_this, void 0, void 0, function () {
                        var pokemonDetail;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch(pokemon.url).then(function (res) { return res.json(); })];
                                case 1:
                                    pokemonDetail = _a.sent();
                                    return [2 /*return*/, {
                                            id: pokemonDetail.id,
                                            name: pokemonDetail.name,
                                            image: pokemonDetail.sprites.front_default,
                                            types: pokemonDetail.types.map(function (t) { return t.type.name; }),
                                        }];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(pokemonPromises)];
            }
        });
    });
}
// Render Pokémon List
function renderPokemonList(pokemonList) {
    pokemonListContainer.innerHTML = ""; // Clear container
    pokemonList.forEach(function (pokemon) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = "\n            <img src=\"".concat(pokemon.image, "\" alt=\"").concat(pokemon.name, "\">\n            <h3>").concat(pokemon.name, "</h3>\n            <p>#").concat(pokemon.id, "</p>\n        ");
        card.addEventListener("click", function () { return showPokemonDetail(pokemon); });
        pokemonListContainer.appendChild(card);
    });
}
// Show Pokémon Detail
function showPokemonDetail(pokemon) {
    pokemonListContainer.classList.add("hidden");
    pokemonDetailContainer.classList.remove("hidden");
    detailContent.innerHTML = "\n        <h2>".concat(pokemon.name, " (#").concat(pokemon.id, ")</h2>\n        <img src=\"").concat(pokemon.image, "\" alt=\"").concat(pokemon.name, "\">\n        <p>Type: ").concat(pokemon.types.join(", "), "</p>\n    ");
}
// Back Button Logic
backButton.addEventListener("click", function () {
    pokemonDetailContainer.classList.add("hidden");
    pokemonListContainer.classList.remove("hidden");
});
// Initialize App
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchPokemonList(20)];
                case 1:
                    pokemonList = _a.sent();
                    renderPokemonList(pokemonList);
                    return [2 /*return*/];
            }
        });
    });
}
function searchPokemon(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, pokemonDetail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!query) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchPokemonList(20)];
                case 1: return [2 /*return*/, _a.sent()]; // Jika query kosong, kembalikan daftar Pokémon awal.
                case 2: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(query))];
                case 3:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 4:
                    pokemonDetail = _a.sent();
                    return [2 /*return*/, [{
                                id: pokemonDetail.id,
                                name: pokemonDetail.name,
                                image: pokemonDetail.sprites.front_default,
                                types: pokemonDetail.types.map(function (t) { return t.type.name; }),
                            }]];
                case 5:
                    alert("Pokémon not found");
                    return [2 /*return*/, []]; // Jika Pokémon tidak ditemukan
            }
        });
    });
}
// Event listener untuk tombol pencarian
searchButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var query, pokemonList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = searchInput.value.trim().toLowerCase();
                return [4 /*yield*/, searchPokemon(query)];
            case 1:
                pokemonList = _a.sent();
                renderPokemonList(pokemonList); // Render hasil pencarian
                return [2 /*return*/];
        }
    });
}); });
// Event listener untuk menangani input ketika menekan Enter
searchInput.addEventListener("keypress", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var query, pokemonList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(event.key === "Enter")) return [3 /*break*/, 2];
                query = searchInput.value.trim().toLowerCase();
                return [4 /*yield*/, searchPokemon(query)];
            case 1:
                pokemonList = _a.sent();
                renderPokemonList(pokemonList); // Render hasil pencarian
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
// Ambil elemen header untuk "Pokedex"
var pokedexTitle = document.getElementById("pokedex-title");
// Fungsi untuk kembali ke tampilan home
function goback() {
    // Menyembunyikan detail Pokémon dan menampilkan daftar Pokémon
    pokemonDetailContainer.classList.add("hidden");
    pokemonListContainer.classList.remove("hidden");
}
// Event listener untuk mengembalikan ke tampilan home saat judul "Pokedex" diklik
pokedexTitle.addEventListener("click", goback);
init();
