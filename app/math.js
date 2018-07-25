import {elements} from './base';
import {bullet} from './view/bullet';

const {box, gameContainer} = elements;

function isCollide(ele1, ele2){
    const ele1Rect = ele1.getBoundingClientRect();
    const ele2Rect = ele2.getBoundingClientRect();
    return !(
        (ele1Rect.bottom < ele2Rect.top) ||
        (ele1Rect.top > ele2Rect.bottom) ||
        (ele1Rect.right < ele2Rect.left) ||
        (ele1Rect.left > ele2Rect.right)
    );
}

function getDeg (e, boxCenter) {
    let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]));
    return angle*(180/Math.PI);
};

function degRad (deg) {
    return deg *(Math.PI/180);
};

export function movePosition (e, box, boxCenter) {
    let mouseAngle = getDeg(e, boxCenter);
    box.style.transform = `translate(-50%, -50%) rotate(${mouseAngle}deg)`;
};

export function shoot (e, boxCenter) {
    //console.log('boom');
    const deg = getDeg(e, boxCenter);
    const bulletInst = bullet();
    bulletInst.moverx = 5 * Math.sin(degRad(deg));
    bulletInst.movery = -5 * Math.cos(degRad(deg));
    bulletInst.style.left = (boxCenter[0]-20) + 'px';
    bulletInst.style.top = (boxCenter[1]-20)+ 'px';
    gameContainer.appendChild(bulletInst);
};

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

 



