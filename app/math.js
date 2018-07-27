import {elements} from './base';
import {bullet} from './view/bullet';

const {box, gameContainer} = elements;

export function isCollide(ele1, ele2){
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
    const deg = getDeg(e, boxCenter);
    const bulletInst = bullet();
    bulletInst.moverx = 10 * Math.sin(degRad(deg));
    bulletInst.movery = -10 * Math.cos(degRad(deg));
    bulletInst.style.left = '50%';
    bulletInst.style.top = '50%';
    bulletInst.style.transform =  'translate(-50%, -50%)';
    gameContainer.appendChild(bulletInst);
};



 



