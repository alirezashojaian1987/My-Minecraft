import { useState } from "react";
import type { World } from "../../../../types/world";

import styles from "./AddWorldForm.module.scss";

interface AddWorldFormProps{
    onAdd:(title:string, type:World['type'])=>void;
    onCancel:()=>void;
}

export default function AddWorldForm({onAdd, onCancel}:AddWorldFormProps){
    const [title,setTitle]=useState('');
    const [type,setType]=useState<World['type']>('Survival');

    const handleSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim(), type);
            setTitle('');
            setType('Survival');
        }
    };

    return(
        <form className={styles.AddWorldForm} onSubmit={handleSubmit}>
            <div className={styles.Fields}>
                <input
                    className={styles.TitleInput}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="World name..."
                    autoFocus
                />

                <select
                    className={styles.TypeSelect}
                    value={type}
                    onChange={(e)=>setType(e.target.value as World['type'])}
                >   
                    <option value="Survival">🟩 Survival</option>
                    <option value="Hardcore">🟥 Hardcore</option>
                    <option value="Creative">🟦 Creative</option>
                    <option value="Adventure">🟨 Adventure</option>
                </select>
            </div>

            <div className={styles.Actions}>
                <button type="submit" className={styles.SubmitBtn}>
                    Add World
                </button>

                <button type="button" className={styles.CancelBtn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};