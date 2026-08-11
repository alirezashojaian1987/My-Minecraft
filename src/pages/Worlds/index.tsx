//Hooks
import { useState } from "react";

//Components
import WorldFolder from "./components/WorldFolder";
import AddWorldForm from "./components/AddWorldForm";

//Types
import type { World } from "../../types/world";

//styles
import styles from "./Worlds.module.scss";

const initialWorlds:World[]=[
    {
        id:'1',
        title:"My survival world",
        type:"Survival",
        coordinates:[
            {id:"c1", name:"Village", x:122, y:57, z:-245},
            {id:"c2", name:"Mansion", x:145, y:66, z:200}
        ]
    },

    {
        id:'2',
        title:"Creative test",
        type:"Creative",
        coordinates:[
            {id:"c3", name:"Base", x:0, y:64, z:0},
        ]
    },

    {
        id:'3',
        title:"Hardcore run",
        type:"Hardcore",
        coordinates:[],
    },
];

export default function Worlds(){
    const [worlds, setWorlds]=useState<World[]>(initialWorlds);
    const [expandedId, setExpandedId]=useState<string | null>(null);
    const [showAddForm, setShowAddForm]=useState(false);

    const handleAddWorld=(title:string, type:World['type'])=>{
        const newWorld:World={
            id:Date.now().toString(),
            title,
            type,
            coordinates:[],
        };

        setWorlds([...worlds, newWorld]);
        setShowAddForm(false);
        setExpandedId(newWorld.id);
    };

    const handleDeleteWorld=(id:string)=>{
        if(confirm("Delete this world and all its coorinates?")){
            setWorlds(worlds.filter(w=>w.id!==id));
            if(expandedId===id) setExpandedId(null);
        }
    };

    const handleEditWorld=(id:string, newTitle:string)=>{
        setWorlds(worlds.map(w=>
            w.id===id ? {...w,title:newTitle} : w
        ));
    };

    const handleAddCoordinate=(worldId:string, name:string, x:number, y:number, z:number)=>{
        setWorlds(worlds.map(w=>{
            if(w.id===worldId){
                return{
                    ...w,
                    coordinates:[
                        ...w.coordinates,
                        { id:Date.now().toString(), name, x, y, z }
                    ]
                };
            }
            return w;
        }));
    };

    const handleDeleteCoordinate=(worldId:string, coordId:string)=>{
        setWorlds(worlds.map(w=>{
            if(w.id===worldId){
                return{
                    ...w,
                    coordinates:w.coordinates.filter(c=>c.id!==coordId)
                };
            }
            return w;
        }));
    };

    const handleEditCoordinate=(worldId:string, coordId:string, name:string, x:number, y:number, z:number)=>{
        setWorlds(worlds.map(w=>{
            if(w.id===worldId){
                return{
                    ...w,
                    coordinates:w.coordinates.map(c=>
                        c.id===coordId ? {...c, name, x,y,z} : c
                    )
                };
            }
            return w;
        }));
    };

    const toggleExpand=(id:string)=>{
        setExpandedId(expandedId===id ? null : id);
    };

    return(
        <div className={styles.Worlds}>
            <section className={styles.Hero}>
                <h1>Worlds</h1>
                <p>
                    Manage your Minecraft worlds and save important coordinates.
                    Keep track of places, bases, farms and etc.
                </p>
            </section>

            <div className={styles.Actions}>
                <button
                    className={styles.AddWorldBtn}
                    onClick={()=>setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? "X Cancel" : "+ Add World"}
                </button>
            </div>

            {showAddForm && (
                <AddWorldForm
                    onAdd={handleAddWorld}
                    onCancel={()=>setShowAddForm(false)}
                />
            )}

            <div className={styles.WorldsList}>
                {worlds.length===0 ? (
                    <div className={styles.EmptyState}>
                        <p>🌍 No worlds yet. Create your first world</p>
                    </div>
                ) : (
                    worlds.map(world=>(
                        <WorldFolder
                            key={world.id}
                            world={world}
                            isExpanded={expandedId===world.id}
                            onToggle={()=>toggleExpand(world.id)}
                            onDelete={()=>handleDeleteWorld(world.id)}
                            onEdit={handleEditWorld}
                            onAddCoordinate={handleAddCoordinate}
                            onDeleteCoordinate={handleDeleteCoordinate}
                            onEditCoordinate={handleEditCoordinate}
                        />
                    ))
                )
            }
            </div>
        </div>
    );
};