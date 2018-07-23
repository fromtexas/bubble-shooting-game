import {elements} from './base';
const {box, gameContainer} = elements;
gameContainer.addEventListener('mousemove', movePosition);

const boxCenter = [box.offsetLeft + (box.offsetWidth/2), box.offsetTop + (box.offsetHeight/2)];
console.log(boxCenter);

function movePosition (e) {
    let mouseAngle = getDeg(e);
    box.style.transform = `translate(-50%, -50%) rotate(${mouseAngle}deg)`
    //console.log(mouseAngle);
}

function getDeg (e) {
    let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]));
    return angle*180/Math.PI;
}