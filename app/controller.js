import { elements, clearDom } from "./base";

import { toggle } from "./view/modal";
import { setupEnemies, moveEnemies, hitDetection } from "./view/enemy";
import { updateProgress, updateScore } from "./view/player";
import { moveBullets } from "./view/bullet";
import { updCount, clearCounter, setCounter } from "./view/count";
import { updateRound } from "./view/round";

import { movePosition, shoot } from "./math";

import { Player } from "./model/player";
import { Enemy } from "./model/enemy";
import { Count } from "./model/count";
import { Round } from "./model/round";

function tempDev() {
  const state = {};
  const { gameContainer, startBtn, gameover, box } = elements;
  const boxCenter = [
    box.offsetLeft + box.offsetWidth / 2,
    box.offsetTop + box.offsetHeight / 2
  ];

  gameContainer.addEventListener("mousemove", e =>
    movePosition(e, box, boxCenter)
  );
  gameContainer.addEventListener("mousedown", e => {
    if (state.gameStatus) {
      shoot(e, boxCenter);
    }
  });

  startBtn.addEventListener("click", () => {
    state.gameStatus = true;
    state.player = new Player();
    state.count = new Count(4, 0);
    state.round = new Round();

    updateRound(state.round.stage);
    toggle(state.gameStatus, gameover);
    setCounter();
    state.count.countDown(updCount).then(() => {
      clearCounter();
      setupEnemies(20, Enemy);
      play();
    });
  });

  function gameOver() {
    cancelAnimationFrame(play);
    state.gameStatus = false;
    toggle(state.gameStatus, gameover, state.player.score, state.round.stage);
    clearDom(".bullet");
    clearDom(".enemy");
  }

  function nextRound() {
    if (state.player.score >= state.round.stage * 1000) {
      state.round.increaseRound();
      updateRound(state.round.stage);
    }
  }

  function play() {
    if (state.gameStatus) {
      nextRound();
      moveBullets();
      moveEnemies(state.player, Enemy, state.round.stage);
      updateProgress(state.player.lives, state.player.barWidth);
      hitDetection(state.player.updateScore.bind(state.player), Enemy);
      updateScore(state.player.score, Enemy);

      requestAnimationFrame(play);
      if (state.player.lives < 0) {
        gameOver();
      }
    }
  }
}

//setTimeout(tempDev, 1000); // uncomment this line for dev cause css in dev loading after js

tempDev(); //for prod
