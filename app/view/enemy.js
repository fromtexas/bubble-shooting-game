import {elements} from '../base';
import {isCollide} from '../math';

const {gameContainer, box, base} = elements;


function randomColor() {
    return `radial-gradient(circle, rgba(255, 255, 255, 0.3) ,rgba(${randomMe(255)}, ${randomMe(255)}, ${randomMe(255)}, 0.5))`;
}

function enemyShadow (){
    return `0 0 1rem 0 rgba(${randomMe(255)}, ${randomMe(255)}, ${randomMe(255)}, 0.3)`;
};



export function setupEnemies (num) {
    for(let i = 0; i < num; i++){
        enemyMaker();
    }
};

function enemyMaker () { //would be better  move it to class as bullet
    const enemy = document.createElement('div');
    let x,y,xmove,ymove;
    let randomStartPos = randomMe(4);
    let dirSet = randomMe(9) + 2;
    let dirPos = randomMe(13) - 3;
    switch (randomStartPos) {
        case 0:
            x = 0;
            y = randomMe(gameContainer.clientHeight);
            xmove = dirSet;
            ymove = dirPos;
        break;

        case 1:
            x = gameContainer.clientWidth;
            y = randomMe(gameContainer.clientHeight);
            xmove = dirSet * -1;
            ymove = dirPos;
        break;

        case 2:
            x = randomMe(gameContainer.clientWidth);
            y = 0;
            xmove = dirPos;
            ymove = dirSet;
        break;

        case 3:
            x = randomMe(gameContainer.clientWidth);
            y = gameContainer.clientHeight;
            xmove = dirPos;
            ymove = dirSet * -1;
        break;
    }
    enemy.setAttribute('class', 'enemy');
    enemy.style.left = x + 'px';
    enemy.style.top = y + 'px';
    enemy.style.boxShadow = enemyShadow();
    enemy.style.background = randomColor();
    enemy.style.width = randomMe(6) + 6 + 'rem';
    enemy.style.height = enemy.style.width;
    enemy.score = randomMe(10) + 1 * parseInt(enemy.style.width);
    enemy.moverx = xmove;
    enemy.movery = ymove;
    gameContainer.appendChild(enemy);
};

function randomMe (num){
    return Math.floor(Math.random()*num);
}

export function moveEnemies (player) {
    const tempEnemies = document.querySelectorAll('.enemy');
    let hitter = false;
    [...tempEnemies].forEach(item => {
        if(item.offsetTop > gameContainer.clientHeight || item.offsetTop < 0 || item.offsetLeft > gameContainer.clientWidth || item.offsetLeft < 0){
            item.parentNode.removeChild(item);
            enemyMaker();
        }
        else{
            item.style.top = item.offsetTop + item.movery + 'px';
            item.style.left = item.offsetLeft + item.moverx + 'px';
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


//not nessery. replace it and clearBullets later with one utility function
export function clearEnemies () {
    const tempEnemies = document.querySelectorAll('.enemy');
    [...tempEnemies].forEach(item => {
        item.parentNode.removeChild(item);
    });
};

export function hitDetection(updateScore){
    const enemies = document.querySelectorAll('.enemy');
    const bullets = document.querySelectorAll('.bullet');

    if(enemies.length && bullets.length){
        [...enemies].forEach(enemy => {
            for(let bullet of bullets){
                if(isCollide(enemy, bullet)){
                    updateScore(enemy.score);
                    enemy.parentNode.removeChild(enemy);
                    bullet.parentNode.removeChild(bullet);
                    enemyMaker();
                    break;
                }
            }
        });
    }
};