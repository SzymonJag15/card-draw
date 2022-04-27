const API_URL = "https://pokeapi.co/api/v2";
const CARD_LIMIT = 20;

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

const getTemplateIndexCard = (index) => {
  const card = `
    <p class="card-item__title">${index + 1}</p>
  `;

  return card;
}

const renderCardItem = (card, isVisible) => {
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

const generatePokeCard = async (isVisible) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${CARD_LIMIT}`);
  const { results } = await response.json();

  const pickedCard = pickOneCard(results);
  const pickedCardData = await getPokemon(pickedCard);
  const card = getTemplatePokeCard(pickedCardData);

  renderCardItem(card, isVisible);
}

const generateIndexCard = (isVisible) => {
  const indexArray = [...Array(CARD_LIMIT).keys()];
  const pickedCard = pickOneCard(indexArray);
  const pickedCardData = getTemplateIndexCard(pickedCard);

  renderCardItem(pickedCardData, isVisible);
}

const renderCard = async () => {
  const isPokeMode = document.querySelector('#switch-mode__checkbox').checked;
  const isVisible = document.querySelector(".card-item");

  if(isPokeMode) {
    generatePokeCard(isVisible);
    return;
  }

  generateIndexCard(isVisible);
  return;
};

document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.querySelector("#draw-card");
  drawBtn.addEventListener("click", renderCard);
});
