import {elements} from '../base';

const {score, progressBar} = elements;

export function updateScore (scoreNum) {
    score.innerHTML = scoreNum;
};

export function updateProgress (lives, barWidth){
    progressBar.style.width = (lives/barWidth)*100 + '%';
};