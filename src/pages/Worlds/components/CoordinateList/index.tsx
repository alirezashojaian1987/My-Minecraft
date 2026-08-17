import { useState } from "react";
import CoordinateItem from "../CoordinateItem";
import AddCoordinateForm from "../AddCoordinateForm";
import type {Coordinates} from "../../../../types/world";

import styles from "./CoordinateList.module.scss";

interface CoordinateListProps{
    worldId:string;
    coordinates:Coordinates[];
    onAdd:(worldId:string, name:string, x:number, y:number, z:number)=>void;
    onDelete:(worldId:string, name:string)=>void;
    onEdit:(worldId:string, coordId:string, name:string, x:number, y:number, z:number)=>void;
}

export default function CoordinateList({worldId, coordinates, onAdd, onDelete, onEdit}:CoordinateListProps){
    const [showAddForm, setShowAddForm]=useState(false);

    return(
        <div className={styles.CoordinateList}>
            {coordinates.length===0 ? (
                <div className={styles.EmptyState}>
                    <p>📍 No coordinates saved yet.</p>
                </div>
            ) : (
                <div className={styles.List}>
                    {coordinates.map(coord=>(
                        <CoordinateItem
                            key={coord.id}
                            coordinates={coord}
                            onDelete={()=>onDelete(worldId, coord.id)}
                            onEdit={(name,x,y,z)=>onEdit(worldId, coord.id, name, x, y, z)}
                        />
                    ))}
                </div>
            )}

            {showAddForm ? (
                <AddCoordinateForm
                    onAdd={(name,x,y,z)=>{
                        onAdd(worldId, name, x, y, z);
                        setShowAddForm(false);
                    }}
                    onCancel={()=>setShowAddForm(false)}
                />
            ) : (
                <button className={styles.AddCoordBtn} onClick={()=>setShowAddForm(true)}>
                    + Add coordinate
                </button>
            )}
        </div>
    );
}