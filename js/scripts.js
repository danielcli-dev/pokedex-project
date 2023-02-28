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

  function add(pokemon) {
    if (typeof pokemon === "object") pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
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

// Function for printing array values
function printArrayDetails(user) {
  document.write(` <li>
    ${user.name} ${
    typeof user.height !== "undefined" ? `(height: ${user.height})` : ""}
    
   ${user.height > 1 ? "- Wow, that's big!" : ""}
    </li>`);
}

// Replaced the for loop with forEach() function
// pokemonRepository.getAll().forEach(printArrayDetails);

pokemonRepository.add({ name: "Pikachu" });
pokemonRepository.getAll().forEach(printArrayDetails);

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));
