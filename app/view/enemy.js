import {elements} from '../base';

const {gameContainer} = elements;

export function setupEnemies (num) {
    for(let i = 0; i < num; i++){
        enemyMaker();
    }
};

function enemyMaker () {
    const enemy = document.createElement('div');
    let x,y,xmove,ymove;
    let randomStartPos = randomMe(4);
    let dirSet = randomMe(5) + 2;
    let dirPos = randomMe(7) - 3;
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
    enemy.moverx = xmove;
    enemy.movery = ymove;
    gameContainer.appendChild(enemy);
    //return enemy;
};

function randomMe (num){
    return Math.floor(Math.random()*num);
}

export function moveEnemies () {
    const tempEnemies = document.querySelectorAll('.enemy');
    [...tempEnemies].forEach(item => {
        if(item.offsetTop > gameContainer.clientHeight || item.offsetTop < 0 || item.offsetLeft > gameContainer.clientWidth || item.offsetLeft < 0){
            item.parentNode.removeChild(item);
            enemyMaker();
        }
        else{
            item.style.top = item.offsetTop + item.movery + 'px';
            item.style.left = item.offsetLeft + item.moverx + 'px';
        }
    });
}