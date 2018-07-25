export function toggle (status, modalEle) {
    if(!status){
        modalEle.style.visibility = 'visible';
    } else {
        modalEle.style.visibility = 'hidden';
    }
}