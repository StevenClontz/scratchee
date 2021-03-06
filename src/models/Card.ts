import md5 from 'md5';

export class Row {
    answer: number;
    scratches: Set<number>;

    constructor(answer:number=0) {
        this.answer = answer;
        this.scratches = new Set();
    }

    scratch(answer:number) {
        this.scratches.add(answer);
    }

    reset() {
        this.scratches = new Set();
    }

    score() {
        if (!this.scratches.has(this.answer)) {
            return 0;
        } else if (this.scratches.size === 1) {
            return 10;
        } else if (this.scratches.size === 2) {
            return 6;
        } else if (this.scratches.size === 3) {
            return 3;
        } else if (this.scratches.size === 4) {
            return 1;
        } else {
            return 0;
        }
    }

    hasAnswer(answer:number) {
        return this.answer===answer;
    }

    answered() {
        return this.scratches.has(this.answer);
    }
}

export class Card {
    title: string;
    description: string;
    resets: number;
    rows: Array<Row>;

    constructor(title:string="Untitled", description:string="No description", answers: Array<number>=[]) {
        this.title = title;
        this.description = description;
        this.resets = 0;
        this.rows = answers.map(a=>new Row(a))
    }

    score() {
        return this.rows.reduce((total:number, row:Row) => total + (row.score() || 0), 0);
    }

    maxScore() {
        return this.rows.length*10;
    }

    reset() {
        this.resets = this.resets+1;
        this.rows.forEach(r=>r.reset());
    }

    addRow(answer:number=0) {
        this.rows = [...this.rows, new Row(answer)]
    }

    removeRow() {
        this.rows = this.rows.slice(0,this.rows.length-1)
    }

    storeState() {
        let scratchArray = this.rows.map(r=>Array.from(r.scratches))
        localStorage.setItem(
            this.md5(), 
            JSON.stringify({"scratchArray":scratchArray,"resets":this.resets}),
        );
    }

    loadState() {
        try { 
            let state = JSON.parse(localStorage.getItem(this.md5()))
            this.resets = state.resets
            state.scratchArray.forEach((scratches:Array<number>,i:number) => {
                this.rows[i].scratches = new Set(scratches)
            }) 
        } catch {} finally {}
    }
    
    url(fragment:boolean=false) {
        if (fragment) {
            return location.protocol+"//"+location.host+location.pathname+"#/card?...";
        } else {
            return location.protocol+"//"+location.host+location.pathname+"#/card?"+this.base64();
        }
    }

    json() {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            answers: this.rows.map(r=>r.answer),
        })
    }

    base64() {
        return btoa(this.json());
    }

    md5() {
        return md5(this.base64());
    }

    id() {
        return this.md5().substring(0,6);
    }

    static fromJson (jsonString:string) {
        let result = JSON.parse(jsonString)
        return new this(result.title,result.description,result.answers)
    }

    static fromBase64 (b64string:string) {
        return this.fromJson(atob(b64string))
    }
}