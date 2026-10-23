import { useState } from "react";

import styles from "./AddCoordinateForm.module.scss";

interface AddCoordinateFormProps{
    onAdd:(name:string, x:number, y:number, z:number)=>void;
    onCancel:()=>void;
}

export default function AddCoordinateForm({onAdd, onCancel}:AddCoordinateFormProps){
    const [name,setName]=useState('');
    const [x,setX]=useState('');
    const [y,setY]=useState('');
    const [z,setZ]=useState('');

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        const xNum=parseInt(x);
        const yNum=parseInt(y);
        const zNum=parseInt(z);

        if(name.trim() && !isNaN(xNum) && !isNaN(yNum) && !isNaN(zNum)){
            onAdd(name.trim(), xNum, yNum, zNum);
            setName('');
            setX('');
            setY('');
            setZ('');
        }
    };

    return(
        <form className={styles.AddCoordinateForm} onSubmit={handleSubmit}>
            <div className={styles.Fields}>
                <input
                    className={styles.NameInput}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Coordinate name..."
                    autoFocus
                />

                <input
                    className={styles.CoordInput}
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    placeholder="X"
                    type="number"
                />

                <input
                    className={styles.CoordInput}
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    placeholder="Y"
                    type="number"
                />

                <input
                    className={styles.CoordInput}
                    value={z}
                    onChange={(e) => setZ(e.target.value)}
                    placeholder="Z"
                    type="number"
                />
            </div>

            <div className={styles.Actions}>
                <button type="submit" className={styles.SubmitBtn}>
                    Add
                </button>

                <button type="button" className={styles.CancelBtn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}