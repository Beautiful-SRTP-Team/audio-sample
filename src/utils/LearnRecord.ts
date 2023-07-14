export class LearnRecord {

    date: Date
    total: number
    correct:number

    constructor(date: Date, total: number) {
        this.date = date
        this.total = total
        this.correct = total-3
    }

    mapToLabels():number{
        return this.date.getTime()
    }

    mapToData():{x:number,y:number}{
        return {x:this.date.getTime(),y:this.total}
    }
    mapToCorrectData():{x:number,y:number}{
        return {x:this.date.getTime(),y:this.correct}
    }
    mapToCorrectRate():{x:number,y:number}{
        return {x:this.date.getTime(),y:this.correct/this.total}
    }
}

