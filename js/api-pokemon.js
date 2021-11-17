const d = document,
  $main = d.querySelector(".main"),
  $others = d.querySelector(".others"),
  $links = d.querySelector(".links");
let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=4";

function getRandomNumString() {
  return Math.floor(Math.random() * 898).toString();
}

function getUlrRandomPokemon() {
  let randomNum = getRandomNumString();
  return "https://pokeapi.co/api/v2/pokemon/" + randomNum + "/";
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

async function loadRandomPokemon(url) {
  try {
    $main.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Loading...">`;
    let response = await fetch(url),
      json = await response.json(),
      $template = "";

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    try {
      $template += `
                <div class="container">
                    <section class="poke-img">
                        <div class="pokemon">
                            <h3 class="poke-name">${json.name.toUpperCase()}</h3>
                            <figure class="figure">
                                <img class="pokeimage" src="${
                                  json.sprites.front_shiny
                                }" alt="${json.name}">
                            </figure>
                        </div>
                    </section>
                    <section class="info">
                        <ul class="info-poke">
                            <li class="item">
                                <span class="item-1">NO.</span>
                                <span class="item-2">${json.id}</span>
                            </li>
                            <li class="item">
                                <span class="item-1">LEVEL</span>
                                <span class="item-2">100</span>
                            </li>
                            <li class="item">
                                <span class="item-1">TYPE</span>
                                <span class="item-2">${capitalize(
                                  json.types[0].type.name
                                )}</span>
                            </li>
                            <li class="item">
                                <span class="item-1">HABILITY</span>
                                <span class="item-2">${capitalize(
                                  json.abilities[0].ability.name
                                )}</span>
                            </li>
                            <li class="item">
                                <span class="item-1">HEIGHT</span>
                                <span class="item-2">${
                                  json.height / 10
                                } m</span>
                            </li>
                            <li class="item">
                                <span class="item-1">WEIGHT</span>
                                <span class="item-2">${
                                  json.weight / 10
                                } Kg</span>
                            </li>
                        </ul>
                    </section>
                </div>`;
    } catch (error) {
      console.log(error);
      let message = error.statusText || "An unexpected error occurred";
      $template += `
            <figure><figcaption>Error ${error.status}: ${message}</figcaption></figure>`;
    }

    $main.innerHTML = $template;
  } catch (error) {
    console.log(error);
    let message = error.statusText || "An unexpected error occurred";
    $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
  }
}

async function loadPokemon(url) {
  try {
    $main.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Loading...">`;
    let response = await fetch(url),
      json = await response.json(),
      $template = "",
      $prevLink,
      $nextLink;

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `<figure><img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
        </figure>`;
      } catch (error) {
        console.log(error);
        let message = error.statusText || "An unexpected error occurred";
        $template += `<figure><figcaption>Error ${error.status}: ${message}</figcaption></figure>`;
      }
    }

    $others.innerHTML = $template;

    $prevLink = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";
    $links.innerHTML = $prevLink + " " + $nextLink;
  } catch (error) {
    console.log(error);
    let message = error.statusText || "An unexpected error occurred";
    $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
  }
}

d.addEventListener("DOMContentLoaded", (e) => {
  loadPokemon(url);
  loadRandomPokemon(getUlrRandomPokemon());
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadRandomPokemon(getUlrRandomPokemon());
    loadPokemon(e.target.getAttribute("href"));
  }
});
