import {elements} from './base';

import {moveBullets} from './math';

import {toggle} from './view/modal';




const state = {};
const {gameContainer, startBtn, gameover} = elements;



startBtn.addEventListener('click', () => {
    state.gameStatus = true;
    toggle(state.gameStatus, gameover);
    play();
});

function play () {
    if(state.gameStatus){
        moveBullets();
        requestAnimationFrame(play)
    }
};


