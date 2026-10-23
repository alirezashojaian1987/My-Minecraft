import { useState } from "react";

import CoordinateList from "../CoordinateList";
import type { World } from "../../../../types/world";
import styles from "./WorldFolder.module.scss";

interface WorldFolderProps{
    world:World;
    isExpanded:boolean;
    onToggle:()=>void;
    onDelete:()=>void;
    onEdit:(id:string, newTitle:string, newSeed:string)=>void;
    onAddCoordinate:(worldId:string, name:string, x:number, y:number, z:number)=>void;
    onDeleteCoordinate: (worldId: string, coordId: string)=>void;
    onEditCoordinate:(worldId:string, coordId:string, name:string, x:number, y:number, z:number)=>void;
};

const typeIcons = {
  Survival: '🟩',
  Hardcore: '🟥',
  Creative: '🟦',
  Adventure: '🟨',
};

const typeLabels={
  Survival: 'Survival',
  Hardcore: 'Hardcore',
  Creative: 'Creative',
  Adventure: 'Adventure',
};

export default function WorldFolder({world, isExpanded, onToggle, onDelete, onEdit, onAddCoordinate, onDeleteCoordinate, onEditCoordinate}: WorldFolderProps){
  const [isEditing, setIsEditing]=useState(false);
  const [editTitle, setEditTitle]=useState(world.title);
  const [editSeed, setEditSeed]=useState(world.seed);

  const handleEditSubmit=()=>{
    if(editTitle.trim()){
      onEdit(world.id, editTitle.trim(), editSeed.trim() || 'Random');
      setIsEditing(false);
    }
  };

  const startEdit=(e: React.MouseEvent)=>{
    e.stopPropagation();
    setIsEditing(true);
    setEditTitle(world.title);
    setEditSeed(world.seed);
  };

  return(
      <div className={styles.WorldFolder}>
        <div className={styles.Header} onClick={onToggle}>
          <div className={styles.Left}>
            <span className={styles.Arrow}>{isExpanded ? '▼' : '▶'}</span>
            <span className={styles.Icon}>{typeIcons[world.type]}</span>

            {isEditing ? (
              <div className={styles.EditRow} onClick={(e)=>e.stopPropagation()}>
                <input
                  className={styles.EditInput}
                  value={editTitle}
                  onChange={(e)=>setEditTitle(e.target.value)}
                  onKeyDown={(e)=>e.key==='Enter' && handleEditSubmit()}
                  onClick={(e)=>e.stopPropagation()}
                  autoFocus
                />

                <input
                  className={styles.EditSeed}
                  value={editSeed}
                  onChange={(e) => setEditSeed(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
                  placeholder="Seed"
                />
              </div>
            ) : (
              <div className={styles.TitleGroup}>
                <span className={styles.Title}>{world.title}</span>
                <span className={styles.Seed}>🌱 {world.seed}</span>
              </div>
            )}
          </div>

          <div className={styles.Right}>
            <span className={styles.Badge}>
              {typeLabels[world.type]}
            </span>

            <span className={styles.Count}>
              {world.coordinates.length} coord{world.coordinates.length !== 1 ? 's' : ''}
            </span>

            <button
              className={styles.EditBtn}
              onClick={startEdit}
              aria-label="Edit World"
            >
              ✏️
            </button>

            <button
              className={styles.DeleteBtn}
              onClick={(e)=>{
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Delete World"
            >
              🗑️
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className={styles.Content}>
            <CoordinateList
              worldId={world.id}
              coordinates={world.coordinates}
              onAdd={onAddCoordinate}
              onDelete={onDeleteCoordinate}
              onEdit={onEditCoordinate}
            />
          </div>
        )}
      </div>
  );
};