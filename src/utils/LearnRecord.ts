export class LearnRecord {

    date: Date
    total: number

    constructor(date: Date, total: number) {
        this.date = date
        this.total = total
    }

    mapToLabels():string{
        return this.date.toISOString()
    }

    mapToData():{x:string,y:number}{
        return {x:this.date.toISOString(),y:this.total}
    }
}

