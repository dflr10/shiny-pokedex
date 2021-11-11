const d = document,
  $main = d.querySelector(".main"),
  $others = d.querySelector(".others"),
  $links = d.querySelector(".links");
let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=4";
let urlRandom = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1";

async function loadPokemon(url) {
  try {
    $main.innerHTML = `<img class="loader" src="assets/loader.svg" alt="Loading...">`;
    let response = await fetch(url),
      json = await response.json(),
      $template = "",
      $prevLink,
      $nextLink;

    console.log(json);

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    for (let i = 0; i < json.results.length; i++) {
      //console.log(json.results[i]);
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();
        console.log(pokemon);
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        $template += `
        <figure>
        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
        <figcaption>${pokemon.name}</figcaption>
        </figure>
        `;
      } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrió un ERROR";
        $template += `
        <figure>
        <figcaption>
        Error ${error.status}: ${message}
        </figcaption>
        </figure>`;
      }
    }

    $main.innerHTML = $template;
    $others.innerHTML = $template;
    $prevLink = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";

    $links.innerHTML = $prevLink + " " + $nextLink;
  } catch (error) {
    console.log(error);
    let message = error.statusText || "Ocurrió un ERROR";
    $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
  }
}

async function loadRandomPokemon(url) {
  try {
    $main.innerHTML = `<img class="loader" src="assets/loader.svg" alt="Loading...">`;
    let response = await fetch(url),
      json = await response.json(),
      $template = "",
      $prevLink,
      $nextLink;

    console.log(json);

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    for (let i = 0; i < json.results.length; i++) {
      //console.log(json.results[i]);
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();
        console.log(pokemon);
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        $template += `
        <figure>
        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
        <figcaption>${pokemon.name}</figcaption>
        </figure>
        `;
      } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrió un ERROR";
        $template += `
        <figure>
        <figcaption>
        Error ${error.status}: ${message}
        </figcaption>
        </figure>`;
      }
    }

    $main.innerHTML = $template;
    $others.innerHTML = $template;
    $prevLink = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";

    $links.innerHTML = $prevLink + " " + $nextLink;
  } catch (error) {
    console.log(error);
    let message = error.statusText || "Ocurrió un ERROR";
    $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
  }
}

d.addEventListener("DOMContentLoaded", (e) => loadPokemon(url));

d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemon(e.target.getAttribute("href"));
  }
});
