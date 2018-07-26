export class Player {
    constructor () {
        this.score = 0;
        this.barWidth = 100;
        this.lives = 100;
    }

    decreaseLives () {
        this.lives--;
    }
}