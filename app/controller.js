import {elements} from './base';

import {toggle} from './view/modal';
import {setupEnemies, moveEnemies} from './view/enemy';

import {moveBullets, movePosition, shoot} from './math';


function tempDev () {
    const state = {};
    const {gameContainer, startBtn, gameover, box} = elements;
    const boxCenter = [box.offsetLeft + (box.offsetWidth/2), box.offsetTop + (box.offsetHeight/2)];
    
    gameContainer.addEventListener('mousemove', (e) => movePosition(e, box, boxCenter));
    gameContainer.addEventListener('mousedown', (e) => {
        if(state.gameStatus){
            shoot(e, boxCenter);
        }
    });
    
    startBtn.addEventListener('click', () => {
        state.gameStatus = true;
        toggle(state.gameStatus, gameover);
        setupEnemies(10)
        play();
    });
    
    function play () {
        if(state.gameStatus){
            moveBullets();
            moveEnemies();
            requestAnimationFrame(play)
        }
    };
};

setTimeout(tempDev, 1000); //css in dev loading after js




