import {randomMe} from '../base';
import {elements} from '../base';

const {gameContainer} = elements;

export class Enemy {
    constructor () {
        this.randomStartPos = randomMe(4);
        this.dirSet = randomMe(9) + 2;
        this.dirPos = randomMe(13) - 3;
    }

    setStartPos () {
        switch (this.randomStartPos) {
            case 0:
                this.x = 0;
                this.y = randomMe(gameContainer.clientHeight);
                this.xmove = this.dirSet;
                this.ymove = this.dirPos;
            break;
    
            case 1:
                this.x = gameContainer.clientWidth;
                this.y = randomMe(gameContainer.clientHeight);
                this.xmove = this.dirSet * -1;
                this.ymove = this.dirPos;
            break;
    
            case 2:
                this.x = randomMe(gameContainer.clientWidth);
                this.y = 0;
                this.xmove = this.dirPos;
                this.ymove = this.dirSet;
            break;
    
            case 3:
                this.x = randomMe(gameContainer.clientWidth);
                this.y = gameContainer.clientHeight;
                this.xmove = this.dirPos;
                this.ymove = this.dirSet * -1;
            break;
        }
    }
}