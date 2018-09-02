import { elements } from "../base";

const { gameContainer } = elements;

export function setCounter() {
  const counter = document.createElement("div");
  counter.setAttribute("class", "count");
  gameContainer.appendChild(counter);
}

export function clearCounter() {
  const count = document.querySelector(".count");
  count.parentNode.removeChild(count);
}

export function updCount(num) {
  const count = document.querySelector(".count");
  count.innerHTML = num;
}
