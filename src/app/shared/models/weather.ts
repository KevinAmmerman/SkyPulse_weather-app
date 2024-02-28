export class Weather {
    time: number;
    icon: string;
    temperatureMin: number;
    temperatureMax: number;
    apparentTemperatureHigh: number;

    constructor(obj: any) {
        this.time = obj.time;
        this.icon = obj.icon;
        this.temperatureMin = obj.temperatureMin;
        this.temperatureMax = obj.temperatureMax;
        this.apparentTemperatureHigh = obj.apparentTemperatureHigh;
    }
}
