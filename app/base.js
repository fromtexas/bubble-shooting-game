export const elements = {
  gameContainer: document.querySelector(".game-container"),
  box: document.querySelector(".box"),
  gameover: document.querySelector(".gameover"),
  startBtn: document.querySelector(".btn--start"),
  base: document.querySelector(".base"),
  score: document.querySelector(".score"),
  progressBar: document.querySelector(".progress__bar"),
  round: document.querySelector(".round")
};

export function randomMe(num) {
  return Math.floor(Math.random() * num);
}

export function clearDom(eleClass) {
  const eles = document.querySelectorAll(eleClass);
  [...eles].forEach(item => {
    item.parentNode.removeChild(item);
  });
}
