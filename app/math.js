import {elements} from './base';
import {bullet} from './view/bullet';

const {box, gameContainer} = elements;

/////////////////////////////////////
function tempDev () {
    const boxCenter = [box.offsetLeft + (box.offsetWidth/2), box.offsetTop + (box.offsetHeight/2)];

    gameContainer.addEventListener('mousemove', movePosition);
    gameContainer.addEventListener('mousedown', shoot);

    function getDeg (e) {
        let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]));
        return angle*(180/Math.PI);
    }

    function degRad (deg) {
        return deg *(Math.PI/180);
    }

    function movePosition (e) {
        let mouseAngle = getDeg(e);
        box.style.transform = `translate(-50%, -50%) rotate(${mouseAngle}deg)`
    }

    function shoot (e) {
        console.log('boom');
        const deg = getDeg(e);
        const bulletInst = bullet();
        bulletInst.moverx = 5 * Math.sin(degRad(deg));
        bulletInst.movery = -5 * Math.cos(degRad(deg));
        bulletInst.style.left = (boxCenter[0]-20) + 'px';
        bulletInst.style.top = (boxCenter[1]-20)+ 'px';
        gameContainer.appendChild(bulletInst);
    }
}

////////////////////////////////////////////   

export function moveBullets () {
    let tempBullets = document.querySelectorAll('.bullet');
    if(tempBullets){
        [...tempBullets].forEach(item => {
            item.style.top = item.offsetTop + item.movery + 'px';
            item.style.left = item.offsetLeft + item.moverx + 'px';
        });
    } 
}

setTimeout(tempDev, 1000); ////css in dev loading after js
 



