import {elements, randomMe} from '../base';
import {isCollide} from '../math';


const {gameContainer, box, base} = elements;


function randomColor() {
    return `radial-gradient(circle, rgba(255, 255, 255, 0.3) ,rgba(${randomMe(255)}, ${randomMe(255)}, ${randomMe(255)}, 0.5))`;
}

function enemyShadow (){
    return `0 0 1rem 0 rgba(${randomMe(255)}, ${randomMe(255)}, ${randomMe(255)}, 0.3)`;
};



export function setupEnemies (num, Enemy) {
    for(let i = 0; i < num; i++){
        enemyMaker(new Enemy);
    }
};

function enemyMaker (enemyObj) {
    enemyObj.setStartPos(); 
    const enemy = document.createElement('div');
    enemy.setAttribute('class', 'enemy');
    enemy.style.left = enemyObj.x + 'px';
    enemy.style.top = enemyObj.y + 'px';
    enemy.style.boxShadow = enemyShadow();
    enemy.style.background = randomColor();
    enemy.style.width = randomMe(6) + 6 + 'rem';
    enemy.style.height = enemy.style.width;
    enemy.score = randomMe(10) + 1 * parseInt(enemy.style.width);
    enemy.moverx = enemyObj.xmove;
    enemy.movery = enemyObj.ymove;
    gameContainer.appendChild(enemy);
};

export function moveEnemies (player, Enemy, stage) {
    const tempEnemies = document.querySelectorAll('.enemy');
    let hitter = false;
    [...tempEnemies].forEach(item => {
        if(item.offsetTop > gameContainer.clientHeight || item.offsetTop < 0 || item.offsetLeft > gameContainer.clientWidth || item.offsetLeft < 0){
            item.parentNode.removeChild(item);
            enemyMaker(new Enemy);
        }
        else{
            item.style.top = stage - 1 + item.offsetTop + item.movery + 'px';
            item.style.left = stage - 1 + item.offsetLeft + item.moverx + 'px';
        }

        if(isCollide(box, item)){
            hitter = true;
            player.decreaseLives();
        }

        if(!hitter){
            base.style.backgroundColor = '#FA676B';
            hitter = false;
        }
        else{
            base.style.backgroundColor = '#7b0003';
        }
    });
};



export function hitDetection(updateScore, Enemy){
    const enemies = document.querySelectorAll('.enemy');
    const bullets = document.querySelectorAll('.bullet');

    if(enemies.length && bullets.length){
        [...enemies].forEach(enemy => {
            for(let bullet of bullets){
                if(isCollide(enemy, bullet)){
                    updateScore(enemy.score);
                    enemy.parentNode.removeChild(enemy);
                    bullet.parentNode.removeChild(bullet);
                    enemyMaker(new Enemy);
                    break;
                }
            }
        });
    }
};