export class Weather {
    timestamp: number;
    date: string;
    weekday: string;
    icon: string;
    summary: string;
    temperatureMin: number;
    temperatureMax: number;
    apparentTemperatureHigh: number;


    constructor(obj: any) {
        this.timestamp = obj.time;
        this.date = this.getDate(obj.time);
        this.weekday = this.getWeekday(obj.time)
        this.icon = obj.icon;
        this.summary = obj.summary;
        this.temperatureMin = Math.round(obj.temperatureMin);
        this.temperatureMax = Math.round(obj.temperatureMax);
        this.apparentTemperatureHigh = Math.round(obj.apparentTemperatureHigh);
    }


    getWeekday(timestamp: number) {
        const date = new Date(timestamp * 1000);
        const weekday = date.toLocaleDateString('en-US', {
            weekday: 'short',
        });
        return weekday;
    }

    getDate(timestamp: number) {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    }


    public toJSON() {
        return {
            timestamp: this.timestamp,
            date: this.date,
            weekday: this.weekday,
            icon: this.icon,
            summary: this.summary,
            temperatureMin: this.temperatureMin,
            temperatureMax: this.temperatureMax,
            apparentTemperatureHigh: this.apparentTemperatureHigh
        }
    }

    public static fromJSON(json: any): Weather {
        return new Weather({
            timestamp: json.timestamp,
            date: json.date,
            weekday: json.weekday,
            icon: json.icon,
            summary: json.summary,
            temperatureMin: json.temperatureMin,
            temperatureMax: json.temperatureMax,
            apparentTemperatureHigh: json.apparentTemperatureHigh
        })
    }

}
