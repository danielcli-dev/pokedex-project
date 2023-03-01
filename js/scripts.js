// Moved array into an IIFE with added functions

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charmander", height: 1.7, types: ["fire"] },
    { name: "Squirtle", height: 1, types: ["water"] },
    { name: "Caterpie", height: 0.3, types: ["bug"] },
    { name: "Weedle", height: 0.3, types: ["bug", "poison"] },
    { name: "Pidgey", height: 0.3, types: ["flying", "normal"] },
  ];

  // Function to add pokemon to pokemonList array
  function add(pokemon) {
    if (typeof pokemon === "object") pokemonList.push(pokemon);
  }

  // Function to return current pokemonList array
  function getAll() {
    return pokemonList;
  }

  //Function to add list and button element to DOM
  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");

    let button = document.createElement("button");

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    button.innerText = pokemon.name;

    button.classList.add("button");

    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  // Function to console log object from button
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// For loop to print name and height from pokemonList array

function divide(dividend, divisor) {
  if (divisor === 0) {
    return "You're trying to divide by zero.";
  } else {
    let result = dividend / divisor;
    return result;
  }
}

pokemonRepository.add({ name: "Pikachu" });
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
