import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import styles from "./Main_layout.module.scss";

//Components
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Auth from "../../components/Auth/Auth";

//Supabase
import { supabase } from "../../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Main_layout(){
    const [sidebarOpen, setSidebarOpen]=useState(false);
    const [session, setSession]=useState<Session | null>(null);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
            setLoading(false);
        });

        const {data:{subscription}}=supabase.auth.onAuthStateChange(
            (_event, session)=>setSession(session)
        );

        return ()=>subscription.unsubscribe();
    },[]);

    const toggleSidebar = () => setSidebarOpen((prev)=>!prev);

    if(loading){
        return(
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if(!session){
        return <Auth />;
    }

    return(
        <div className={styles.layout}>
            <Header onToggleSidebar={toggleSidebar}/>

            <div className={styles.Main_content}>
                <div
                    className={`${styles.SidebarWrapper} ${sidebarOpen ? styles.Open : ""}`}
                >
                    <Sidebar/>
                </div>

                {sidebarOpen && (
                    <div 
                        className={styles.Overlay} 
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className={styles.Content}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}