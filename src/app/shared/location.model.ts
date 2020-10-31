export interface Location{
    lat:number;
    lng:number;
}

export interface PlaceLocation extends Location{
    address:string;
    staticMapImageUrl:string;
}