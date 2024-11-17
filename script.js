const vitalityElement = document.getElementById("vitality");
const provisionsElement = document.getElementById("provisions");
const goldElement = document.getElementById("gold");
const currentCard = document.getElementById("current-card");
const eventDescription = document.getElementById("event-description");
const drawCardButton = document.getElementById("draw-card");

let vitality = 3;
let provisions = 2;
let gold = 1;

// Função para gerar uma carta aleatória
function drawCard() {
  const suits = ["Espadas", "Copas", "Ouros", "Paus"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "Ás"];

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

// Função para processar o evento da carta
function processCardEvent(card) {
  let description = "";

  switch (card.suit) {
    case "Espadas":
      description = "Você encontrou inimigos!";
      vitality -= 1;
      break;
    case "Copas":
      description = "Um aliado se juntou a você.";
      provisions += 1;
      break;
    case "Ouros":
      description = "Você encontrou um tesouro!";
      gold += 2;
      break;
    case "Paus":
      description = "Terreno difícil. Use uma provisão.";
      provisions -= 1;
      break;
  }

  updateStats();
  return description;
}

// Atualizar os valores exibidos no jogo
function updateStats() {
  vitalityElement.textContent = vitality;
  provisionsElement.textContent = provisions;
  goldElement.textContent = gold;

  if (vitality <= 0) {
    alert("Você foi derrotado! Fim de jogo.");
    drawCardButton.disabled = true;
  }
}

// Ação ao clicar no botão de virar carta
drawCardButton.addEventListener("click", () => {
  const card = drawCard();
  currentCard.textContent = `${card.value} de ${card.suit}`;
  const event = processCardEvent(card);
  eventDescription.textContent = event;
});
