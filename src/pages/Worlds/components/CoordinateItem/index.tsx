import { useState } from "react";
import type { Coordinates } from "../../../../types/world";

import styles from "./CoordinateItem.module.scss";

interface CoordinateItemProps{
    coordinate:Coordinates;
    onDelete:()=>void;
    onEdit:(name:string, x:number, y:number, z:number)=>void;
}

export default function CoordinateItem({coordinate, onDelete, onEdit}:CoordinateItemProps){
    const [isEditing, setIsEditing]=useState(false);
    const [editName, setEditName]=useState(coordinate.name);
    const [editX, setEditX]=useState(coordinate.x.toString());
    const [editY, setEditY]=useState(coordinate.y.toString());
    const [editZ, setEditZ]=useState(coordinate.z.toString());

    const handleEditSubmit=()=>{
        const x=parseInt(editX);
        const y=parseInt(editY);
        const z=parseInt(editZ);
        if(editName.trim() && !isNaN(x) && !isNaN(y) && !isNaN(z)){
            onEdit(editName.trim(), x,y,z);
            setIsEditing(false);
        }
    };

    if(isEditing){
        return(
            <div className={styles.CoordinateItem}>
                <input
                    className={styles.NameInput}
                    value={editName}
                    onChange={(e)=>setEditName(e.target.value)}
                    placeholder="Name"
                />

                <input
                    className={styles.CoordInput}
                    value={editX}
                    onChange={(e)=>setEditX(e.target.value)}
                    placeholder="X:"
                    type="number"
                />

                <input
                    className={styles.CoordInput}
                    value={editY}
                    onChange={(e)=>setEditY(e.target.value)}
                    placeholder="Y:"
                    type="number"
                />

                <input
                    className={styles.CoordInput}
                    value={editZ}
                    onChange={(e)=>setEditZ(e.target.value)}
                    placeholder="Z:"
                    type="number"
                />

                <button className={styles.SaveBtn} onClick={handleEditSubmit}>
                    💾
                </button>

                <button className={styles.CancelBtn} onClick={()=>setIsEditing(false)}>
                    ✕
                </button>
            </div>
        );
    }

    return(
        <div className={styles.CoordinateItem}>
            <span className={styles.Pin}>📍</span>
            <span className={styles.Name}>{coordinate.name}</span>
            <span className={styles.Coords}>{coordinate.x} {coordinate.y} {coordinate.z}</span>

            <div className={styles.Actions}>
                <button className={styles.EditBtn} onClick={()=>setIsEditing(true)}>
                    ✏️
                </button>

                <button className={styles.DeleteBtn} onClick={onDelete}>
                    🗑️
                </button>
            </div>
        </div>
    );
}