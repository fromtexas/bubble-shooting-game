import {elements} from '../base';

const {gameContainer} = elements;

export function bullet () {
    const bulletDiv = document.createElement('div');
    bulletDiv.setAttribute('class', 'bullet');
    return bulletDiv;
}

export function moveBullets () {
    let tempBullets = document.querySelectorAll('.bullet');
    if(tempBullets){
        [...tempBullets].forEach(item => {
            if(item.offsetTop > gameContainer.clientHeight || item.offsetTop < 0 || item.offsetLeft > gameContainer.clientWidth || item.offsetLeft < 0){
                item.parentNode.removeChild(item);
            }
            else {
                item.style.top = item.offsetTop + item.movery + 'px';
                item.style.left = item.offsetLeft + item.moverx + 'px';
            }
        });
    } 
};

export function clearBullets () {
    const tempBullets = document.querySelectorAll('.bullet');
    [...tempBullets].forEach(item => {
        item.parentNode.removeChild(item);
    });
};