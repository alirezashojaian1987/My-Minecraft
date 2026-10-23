//Hooks
import { useState, useEffect } from "react";
import { worldService } from "../../services/worldService";

//Components
import WorldFolder from "./components/WorldFolder";
import AddWorldForm from "./components/AddWorldForm";

//Types
import type { World } from "../../types/world";

//styles
import styles from "./Worlds.module.scss";

export default function Worlds(){
    const [worlds, setWorlds]=useState<World[]>([]);
    const [expandedId, setExpandedId]=useState<string | number | null>(null);
    const [loading, setLoading]=useState(true);
    const [showAddForm, setShowAddForm]=useState(false);

    useEffect(()=>{
        const load=async()=>{
            try{
                const data=await worldService.getWorlds();
                setWorlds(data);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    },[]);

    const handleAddWorld=async (title: string, type: World['type'], seed: string) => {
        try{
            const newWorld=await worldService.createWorld({ title, type, seed });
            setWorlds(prev => [newWorld, ...prev]);
            setShowAddForm(false);
            setExpandedId(newWorld.id);
        } catch (err) {
            console.error("Failed to add world:", err);
            alert("Failed to add world. Check the console.");
        }
    };

    const handleDeleteWorld=async(id: string | number)=>{
        if (!confirm("Delete this world and all its coordinates?")) return;
        try{
            await worldService.deleteWorld(id);
            setWorlds(prev => prev.filter(w => w.id !== id));
            if (expandedId === id) setExpandedId(null);
        } catch (err) {
            console.error("Failed to delete world:", err);
            alert("Failed to delete world.");
        }
    };

    const handleEditWorld=async(id: string | number, newTitle: string, newSeed: string) => {
        try{
            await worldService.updateWorld(id, { title: newTitle, seed: newSeed });
            setWorlds(prev =>
                prev.map(w => (w.id === id ? { ...w, title: newTitle, seed: newSeed } : w))
            );
        } catch (err) {
            console.error("Failed to edit world:", err);
            alert("Failed to edit world.");
        }
    };

    const handleAddCoordinate=async(worldId: string | number, name: string, x: number, y: number, z: number) => {
        try {
            const newCoord=await worldService.addCoordinate(worldId, { name, x, y, z });
            setWorlds(prev =>
                prev.map(w =>
                    w.id === worldId
                        ? { ...w, coordinates: [...w.coordinates, newCoord] }
                        : w
                )
            );
        } catch (err) {
            console.error("Failed to add coordinate:", err);
            alert("Failed to add coordinate.");
        }
    };

    const handleDeleteCoordinate=async (worldId: string | number, coordId: string | number) => {
        try{
            await worldService.deleteCoordinate(coordId);
            setWorlds(prev =>
                prev.map(w =>
                    w.id === worldId
                        ? { ...w, coordinates: w.coordinates.filter(c => c.id !== coordId) }
                        : w
                )
            );
        } catch (err) {
            console.error("Failed to delete coordinate:", err);
            alert("Failed to delete coordinate.");
        }
    };

    const handleEditCoordinate=async(
        worldId: string | number,
        coordId: string | number,
        name: string,
        x: number,
        y: number,
        z: number
    ) => {
        try{
            await worldService.updateCoordinate(coordId, { name, x, y, z });
            setWorlds(prev =>
                prev.map(w =>
                    w.id === worldId
                        ? {
                              ...w,
                              coordinates: w.coordinates.map(c =>
                                  c.id === coordId ? { ...c, name, x, y, z } : c
                              ),
                          }
                        : w
                )
            );
        } catch (err) {
            console.error("Failed to edit coordinate:", err);
            alert("Failed to edit coordinate.");
        }
    };

    const toggleExpand=(id: string | number)=>{
        setExpandedId(expandedId === id ? null : id);
    };

    return(
        <div className={styles.Worlds}>
            {loading ? (
                <div className={styles.EmptyState}><p>Loading worlds…</p></div>
                ) : (
                <>
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
            </>
        )}
        </div>
    );
};