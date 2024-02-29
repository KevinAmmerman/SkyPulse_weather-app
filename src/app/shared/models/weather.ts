export class Weather {
    date: string;
    weekday: string;
    icon: string;
    summary: string;
    temperatureMin: number;
    temperatureMax: number;
    apparentTemperatureHigh: number;


    constructor(obj: any) {
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
        const weekday = date.toLocaleDateString('de-DE', {
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

}
