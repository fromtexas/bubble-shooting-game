import {elements} from './base';

import {toggle} from './view/modal';
import {setupEnemies, moveEnemies, clearEnemies, hitDetection} from './view/enemy';
import {updateProgress, updateScore} from './view/player';
import {moveBullets, clearBullets} from './view/bullet';

import {movePosition, shoot} from './math';

import {Player} from './model/player';


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
        state.player = new Player();
        
        toggle(state.gameStatus, gameover);
        setupEnemies(20);
        play();
    });

    function gameOver () {
        cancelAnimationFrame(play);
        state.gameStatus = false;
        toggle(state.gameStatus, gameover, state.player.score);
        clearEnemies();
        clearBullets();
    }
    
    function play () {
        if(state.gameStatus){
            moveBullets();
            moveEnemies(state.player);
            updateProgress(state.player.lives, state.player.barWidth);
            hitDetection(state.player.updateScore.bind(state.player));
            updateScore(state.player.score);

            requestAnimationFrame(play);
            if(state.player.lives < 0){
                gameOver();
            }
        }
    };
};

setTimeout(tempDev, 1000); //css in dev loading after js




