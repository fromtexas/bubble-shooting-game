export function toggle (status, modalEle, score) {
    if(!status && score === 'undefined'){
        modalEle.style.transform = 'translate(-50%, -50%) scale(1)';
        modalEle.style.visibility = 'visible';
    }
    else if(!status && score !== 'undefined'){
        modalEle.style.transform = 'translate(-50%, -50%) scale(1)';
        modalEle.style.visibility = 'visible';
        modalEle.querySelector('.message').innerHTML = `GAME OVER <br> Your Score: ${score}`;
    }
    else {
        modalEle.style.transform = 'translate(-50%, -50%) scale(0)';
        modalEle.style.visibility = 'hidden';
    }
}