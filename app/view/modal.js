export function toggle (status, modalEle) {
    if(!status){
        modalEle.style.display = 'block';
    } else {
        modalEle.style.display = 'none';
    }
}