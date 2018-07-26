export function toggle (status, modalEle, score) {
    if(!status && score === 'undefined'){
        modalEle.style.visibility = 'visible';
    }
    else if(!status && score !== 'undefined'){
        modalEle.style.visibility = 'visible';
        modalEle.querySelector('.message').innerHTML = `GAME OVER <br> Your Score: ${score}`;
    }
    else {
        modalEle.style.visibility = 'hidden';
    }
}