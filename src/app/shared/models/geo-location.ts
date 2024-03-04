export class GeoLocation {
    country: string;
    city: string;
    lon: number;
    lat: number;

    constructor(obj: any) {
        this.country = obj.country;
        this.city = obj.city;
        this.lon = obj.lon;
        this.lat = obj.lat;
    }
}
