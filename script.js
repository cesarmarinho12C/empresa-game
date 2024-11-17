const vitalityElement = document.getElementById("vitality");
const provisionsElement = document.getElementById("provisions");
const goldElement = document.getElementById("gold");
const currentCard = document.getElementById("current-card");
const eventDescription = document.getElementById("event-description");
const drawCardButton = document.getElementById("draw-card");
const choicesContainer = document.getElementById("choices");

let vitality = 3;
let provisions = 2;
let gold = 1;

function drawCard() {
  const suits = ["Espadas", "Copas", "Ouros", "Paus"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "Ás"];

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

function updateStats() {
  vitalityElement.textContent = vitality;
  provisionsElement.textContent = provisions;
  goldElement.textContent = gold;

  if (vitality <= 0) {
    alert("Você foi derrotado! Fim de jogo.");
    drawCardButton.disabled = true;
  }
}

function processChoices(card) {
  choicesContainer.innerHTML = "";

  if (card.suit === "Espadas") {
    eventDescription.textContent = "Você encontrou inimigos!";
    addChoice("Lutar", () => {
      vitality -= 1;
      updateStats();
    });
    addChoice("Fugir", () => {
      provisions -= 1;
      updateStats();
    });
  } else if (card.suit === "Copas") {
    eventDescription.textContent = "Um aliado se juntou a você.";
    addChoice("Aceitar ajuda", () => {
      provisions += 1;
      updateStats();
    });
    addChoice("Ignorar", () => {
      eventDescription.textContent = "Você segue em frente sem ajuda.";
    });
  } else if (card.suit === "Ouros") {
    eventDescription.textContent = "Você encontrou um tesouro!";
    addChoice("Coletar o tesouro", () => {
      gold += 2;
      updateStats();
    });
    addChoice("Deixar para trás", () => {
      eventDescription.textContent = "Você deixa o tesouro e continua sua jornada.";
    });
  } else if (card.suit === "Paus") {
    eventDescription.textContent = "Terreno difícil. Use uma provisão.";
    addChoice("Usar provisão", () => {
      provisions -= 1;
      updateStats();
    });
    addChoice("Arriscar-se", () => {
      vitality -= 1;
      updateStats();
    });
  }
}

function addChoice(label, action) {
  const button = document.createElement("button");
  button.textContent = label;
  button.onclick = () => {
    action();
    choicesContainer.innerHTML = "";
    drawCardButton.disabled = false;
  };
  choicesContainer.appendChild(button);
}

drawCardButton.addEventListener("click", () => {
  const card = drawCard();
  currentCard.textContent = `${card.value} de ${card.suit}`;
  drawCardButton.disabled = true;
  processChoices(card);
});
