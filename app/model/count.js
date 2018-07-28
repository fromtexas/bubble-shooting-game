export class Count {
    constructor(from, to){
        this.from = from;
        this.to = to;
    }

    countDown (updCount) {
        return new Promise((res) => {
            const interval =  setInterval(() => {
                 if(this.from === this.to){
                    clearInterval(interval);
                    res();
                 }else{
                    this.from--;
                    updCount(this.from);
                 }
             }, 1000);
        });
    }
};