export interface Coordinates{
    id:string;
    name:string;
    x:number;
    y:number;
    z:number;
};

export interface World{
    id:string;
    title:string;
    type:"Survival" | "Creative" | "Adventure" | "Hardcore";
    coordinates:Coordinates[];
};