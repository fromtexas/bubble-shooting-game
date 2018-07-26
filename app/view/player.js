import {elements} from '../base';

const {score, progressBar} = elements;

export function updateScore (scoreNum) {
    score.innerHTML = scoreNum;
}

export function updateProgress (lives, barWidth){
    //const progressBarWidth = (lives/barWidth)*100 + '%';
    progressBar.style.width = (lives/barWidth)*100 + '%';
}