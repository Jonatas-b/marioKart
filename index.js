const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};

const player4 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player5 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const players = [player1, player2, player3, player4, player6, player5];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  appendToTranscription(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`,
  );
  await delay(1000);
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    appendToTranscription(`🏁 Rodada ${round}`);
    await delay(1000);

    // sortear bloco
    let block = await getRandomBlock();
    appendToTranscription(`Bloco: ${block}`);
    await delay(1000);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE,
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE,
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE,
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE,
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      appendToTranscription(
        `${character1.NOME} confrontou com ${character2.NOME}! 🥊`,
      );
      await delay(1000);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER,
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER,
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        appendToTranscription(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`,
        );
        character2.PONTOS--;
        moveCars();
        await delay(1000);
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        appendToTranscription(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`,
        );
        character1.PONTOS--;
        moveCars();
        await delay(1000);
      }

      if (powerResult1 === powerResult2) {
        appendToTranscription("Confronto empatado! Nenhum ponto foi perdido");
        await delay(1000);
      }
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      appendToTranscription(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
      moveCars();
      await delay(1000);
    } else if (totalTestSkill2 > totalTestSkill1) {
      appendToTranscription(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
      moveCars();
      await delay(1000);
    }

    appendToTranscription("----------------------------------------");
    await delay(2000);
  }
}

async function declareWinner(character1, character2) {
  appendToTranscription("Resultado final:");
  appendToTranscription(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  appendToTranscription(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    appendToTranscription(
      `\n${character1.NOME} venceu a corrida! Parabéns! 🏆`,
    );
  else if (character2.PONTOS > character1.PONTOS)
    appendToTranscription(
      `\n${character2.NOME} venceu a corrida! Parabéns! 🏆`,
    );
  else appendToTranscription("A corrida terminou em empate");
}

// ----------------------------------------------------------------

let player1Selected;
let player2Selected;
let selectedPlayer1;
let selectedPlayer2;

function goToPersonSelect() {
  document.getElementById("home").style.display = "none";
  document.getElementById("personSelect").style.display = "flex";
}

function getPerson(num) {
  player1Selected = num;
  selectedPlayer1 = players[num - 1];
  document.getElementById("btn" + num).disabled = true;
  document.getElementById("personSelect-text").innerText =
    `Personagem escolhido: ${selectedPlayer1.NOME}`;


    document.getElementById("personSelect").style.display = "none";
    document.getElementById("secondPersonSelect").style.display = "flex";
    // Disable the selected character for player 2
    document.getElementById("btn2" + player1Selected).disabled = true;
  
}

function getSecondPerson(num) {
  player2Selected = num;
  selectedPlayer2 = players[num - 1];
  document.getElementById("btn2" + num).disabled = true;
  document.getElementById("secondPersonSelect-text").innerText =
    `Personagem escolhido: ${selectedPlayer2.NOME}`;

  setTimeout(() => {
    document.getElementById("secondPersonSelect").style.display = "none";
    document.getElementById("racer").style.display = "flex";
    setCarImages();
  }, 1500);
}

function setCarImages() {
  const carImages = {
    Mario: "./assets/mario-racer.png",
    Luigi: "./assets/luigi-racer.png",
    Peach: "./assets/peach-racer.png",
    Yoshi: "./assets/yoshi-racer.png",
    "Donkey Kong": "./assets/dk-racer.png",
    Bowser: "./assets/bowser-racer.png",
  };
  document.getElementById("car1").src = carImages[selectedPlayer1.NOME];
  document.getElementById("car2").src = carImages[selectedPlayer2.NOME];
}

async function startRace() {
  selectedPlayer1.PONTOS = 0;
  selectedPlayer2.PONTOS = 0;
  moveCars();
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("gameTranscription-content").style.display = "block";
  document.querySelector(".gameTranscription-content").innerHTML =
    `🏁🚨 Corrida entre ${selectedPlayer1.NOME} e ${selectedPlayer2.NOME} começando...\n`;
  await playRaceEngine(selectedPlayer1, selectedPlayer2);
  await declareWinner(selectedPlayer1, selectedPlayer2);
}

function appendToTranscription(text) {
  document.querySelector(".gameTranscription-content").innerHTML +=
    text + "<br>";
}

function moveCars() {
  const car1 = document.getElementById("car1");
  const car2 = document.getElementById("car2");
  const pos1 = (selectedPlayer1.PONTOS / 5) * 100; 
  const pos2 = (selectedPlayer2.PONTOS / 5) * 100;
  car1.style.left = `${pos1}%`;
  car2.style.left = `${pos2}%`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
