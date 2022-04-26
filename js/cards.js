const API_URL = "https://pokeapi.co/api/v2";
const POKE_LIMIT = "20";

const getPokemon = async ({ url }) => {
  const response = await fetch(url);
  const pokemon = await response.json();

  return pokemon;
};

const pickOneCard = (cards) => cards[Math.floor(Math.random() * cards.length)];

const getTemplatePokeCard = (cardData) => {
  const image = cardData.sprites.other.dream_world.front_default;
  const hpStats = cardData.stats[0].base_stat;
  const name = cardData.name;
  const attackStatsValue = cardData.stats[1].base_stat;
  const attackStatsName = cardData.stats[1].stat.name;
  const defenceStatsValue = cardData.stats[2].base_stat;
  const defenceStatsName = cardData.stats[2].stat.name;
  const speedStatsValue = cardData.stats[5].base_stat;
  const speedStatsName = cardData.stats[5].stat.name;

  const card = `
    <img 
      class="card-item__image" 
      src="${image}"
      alt=""
    >
    <p class="card-item__hp">
      <span class="card-item__hp--label">HP</span>
      ${hpStats}
    </p>
    <div>
      <p class="card-item__title">${name}</p>
      <div class="card-item__stats-wrapper">
        <div class="card-item__single-stats">
          <p class="card-item__stats-value">${attackStatsValue}</p>
          <p class="card-item__stats-name">${attackStatsName}</p>
        </div>
        <div class="card-item__single-stats">
          <p class="card-item__stats-value">${defenceStatsValue}</p>
          <p class="card-item__stats-name">${defenceStatsName}</p>
        </div>
        <div class="card-item__single-stats">
          <p class="card-item__stats-value">${speedStatsValue}</p>
          <p class="card-item__stats-name">${speedStatsName}</p>
        </div>
      </div>
    </div>
  `;

  return card;
};

const getIndexCard = (index) => {
  const card = `
    <p class="card-item__title">${index}</p>
  `;

  return card;
}

const renderPokeCard = async (isVisible) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${POKE_LIMIT}`);
  const { results } = await response.json();

  const pickedCard = pickOneCard(results);
  const pickerCardData = await getPokemon(pickedCard);
  const card = getTemplatePokeCard(pickerCardData);

  if (isVisible) {
    isVisible.innerHTML = card;
    return;
  }

  const cardContainer = document.querySelector(".card-container");
  const cardItem = document.createElement("div");

  cardItem.classList.add("card-item");
  cardItem.innerHTML = card;
  cardContainer.appendChild(cardItem);
}

const renderIndexCard = (isVisible) => {
  const indexArray = [...Array(10).keys()];
  const pickedCard = pickOneCard(indexArray);
  const pickerCardData = getIndexCard(pickedCard);

  if (isVisible) {
    isVisible.innerHTML = pickerCardData;
    return;
  }

  const cardContainer = document.querySelector(".card-container");
  const cardItem = document.createElement("div");

  cardItem.classList.add("card-item");
  cardItem.innerHTML = pickerCardData;
  cardContainer.appendChild(cardItem);
}

const renderCard = async () => {
  const isPokeMode = document.querySelector('#switch-mode__checkbox').checked;
  const isVisible = document.querySelector(".card-item");

  if(isPokeMode) {
    renderPokeCard(isVisible);
    return;
  }

  renderIndexCard(isVisible);
  return;
};

document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.querySelector("#draw-card");
  drawBtn.addEventListener("click", renderCard);
});
