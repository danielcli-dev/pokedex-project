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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  // Function to showModal with pokemon details
  function showModal(title, text, image) {
    // Instead of an empty div in html file, div is created here
    let modalContainer = document.createElement("div");
    modalContainer.setAttribute("id", "modal-container");
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = `Height: ${text}m`;

    let imgElement = document.createElement("img");
    imgElement.src = image;

    document.body.appendChild(modalContainer);
    modalContainer.appendChild(modal);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.remove();
  }
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer) {
      hideModal();
    }
  });
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
