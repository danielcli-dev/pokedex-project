// Moved array into an IIFE with added functions

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

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
    listItem.classList.add("list-group-item", "border-0", "pokemon");
    let button = document.createElement("button");

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "text-capitalize");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  function clearListItem() {
    let removeItem = $(".pokemon");
    removeItem.empty();
    removeItem.remove();
  }
  // Function to console log object from button
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  // Function to showModal with pokemon details
  function showModal(title, text, image) {
    // Instead of an empty div in html file, div is created here

    let modal__title = $(".modal-title");

    let modal__body = $(".modal-body");

    modal__title.empty();
    modal__body.empty();

    let imgElement = document.createElement("img");
    imgElement.classList.add("w-50", "mw-200");
    imgElement.src = image;

    let contentElement = document.createElement("h3");
    contentElement.innerText = `Height: ${text}m`;

    modal__title.append(title);
    modal__body.append(imgElement);
    modal__body.append(contentElement);
  }

  function filter() {
    let filterIndex = document.querySelector(".filterIndex");
    filterIndex.addEventListener("click", () => {
      clearListItem();

      pokemonList.forEach(function (pokemon) {
        addListItem(pokemon);
      });
    });

    let filterName = document.querySelector(".filterName");
    filterName.addEventListener("click", () => {
      clearListItem();

      let pokemonListByName = pokemonList.slice();

      pokemonListByName.sort((a, b) => a.name.localeCompare(b.name));
      pokemonListByName.forEach(function (pokemon) {
        addListItem(pokemon);
      });

    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    clearListItem: clearListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    filter: filter,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  pokemonRepository.filter();
});
