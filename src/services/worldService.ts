import { supabase } from "../lib/supabaseClient";
import type { World, Coordinates } from "../types/world";

export const worldService={
    async getWorlds():Promise<World[]>{
        const { data, error }=await supabase
            .from("worlds")
            .select(`
                id,
                title,
                type,
                seed,
                coordinates(id,name,x,y,z)
            `)
            .order('created_at',{ascending:false});
        
        if(error) throw error;
        return data as World[];
    },

    async createWorld(world: Omit<World, 'id' | 'coordinates'>): Promise<World>{
        const { data, error }=await supabase
            .from("worlds")
            .insert({ title:world.title, type:world.type, seed:world.seed })
            .select()
            .single();
        if(error) throw error;
        return{...data, coordinates:[]} as World;
    },

    async updateWorld(id: string | number, updates: { title?: string; seed?: string }): Promise<void>{
        const { error }=await supabase.from('worlds').update(updates).eq('id',id);
        if(error) throw error;
    },

    async deleteWorld(id:string | number):Promise<void>{
        const { error }=await supabase.from('worlds').delete().eq('id',id);
        if(error) throw error;
    },

    async addCoordinate(worldId:string | number, coordinate:Omit<Coordinates, 'id'>):Promise<Coordinates>{
        const { data, error }=await supabase
            .from('coordinates')
            .insert({
                world_id:worldId,
                name:coordinate.name,
                x:coordinate.x,
                y:coordinate.y,
                z:coordinate.z,
            })
            .select()
            .single();
        
        if(error) throw error;
        return data as Coordinates;
    },

    async updateCoordinate(coordId: string | number, updates: Partial<Omit<Coordinates, 'id'>>): Promise<void>{
        const { error }=await supabase.from('coordinates').update(updates).eq('id', coordId);
        if(error) throw error;
    },

    async deleteCoordinate(coordId: string | number): Promise<void>{
        const { error }=await supabase.from('coordinates').delete().eq('id', coordId);
        if (error) throw error;
    },
};