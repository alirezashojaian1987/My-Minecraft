export interface Coordinates{
    id:string | number;
    name:string;
    x:number;
    y:number;
    z:number;
};

export interface World{
    id:string | number;
    title:string;
    type:"Survival" | "Creative" | "Adventure" | "Hardcore";
    seed:string;
    coordinates:Coordinates[];
};