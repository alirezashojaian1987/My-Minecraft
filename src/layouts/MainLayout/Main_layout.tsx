import { Outlet } from "react-router-dom";
import styles from "./Main_layout.module.scss";

//Components
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Main_layout(){
    return(
        <div className={styles.layout}>
            <Header/>

            <div className={styles.Main_content}>
                <Sidebar/>

                <main className={styles.Content}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}