// Sets the data in array
let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Charmander", height: 1.7, types: ["fire"] },
  { name: "Squirtle", height: 1, types: ["water"] },
];

// for (i = 0; i < pokemonList.length; i++) {
//   document.write(
//     `${pokemonList[i].name} (height: ${pokemonList[i].height}) ${
//       pokemonList[i].height > 1 ? "- Wow, that's big!" : ""
//     } <br/><br/>`
//   );
// }

for (i = 0; i < pokemonList.length; i++) {
  let name = pokemonList[i].name;
  let height = pokemonList[i].height;

  document.write(` <li>
  ${name} (height: ${pokemonList[i].height}) ${
    pokemonList[i].height > 1 ? "-Wow, that's big!" : ""
  }
  </li>`);
}
