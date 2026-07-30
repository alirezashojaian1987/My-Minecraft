import { Outlet } from "react-router-dom";

import styles from "./Main_layout.module.scss";

export default function Main_layout(){
    return(
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                Sidebar
            </aside>

            <div className={styles.right_section}>
                <header className={styles.header}>
                    Header
                </header>

                <main className={styles.content}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}