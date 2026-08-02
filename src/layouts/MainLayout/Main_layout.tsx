import { useState } from "react";

import { Outlet } from "react-router-dom";
import styles from "./Main_layout.module.scss";

//Components
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Main_layout(){
    const [sidebarOpen, setSidebarOpen]=useState(false);

    const toggleSidebar = () => setSidebarOpen((prev)=>!prev);

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