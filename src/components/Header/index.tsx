import styles from "./Header.module.scss";
import Minecraft_logo from "../../assets/images/mc_logo.png";
import { IoMenuOutline, IoLogOutOutline } from "react-icons/io5";
import { supabase } from "../../lib/supabaseClient";


interface HeaderProps{
    onToggleSidebar?:()=>void;
}

export default function Header({onToggleSidebar}:HeaderProps){
    const handleLogout=async()=>{
        await supabase.auth.signOut();
    };

    return(
        <header className={styles.Header}>
            <div className={styles.Logo_container}>
                <button
                    className={styles.MenuButton}
                    onClick={onToggleSidebar}
                    aria-label="Toggle navigation"
                >
                    <IoMenuOutline/>
                </button>

                <img
                    src={Minecraft_logo}
                    alt="Minecraft logo"
                    className={styles.Logo}
                />
            </div>

            <h1 className={styles.Title}><span>Mine</span> Panel</h1>

            <div className={styles.Right_section}>
                <button
                    className={styles.LogoutBtn}
                    onClick={handleLogout}
                    aria-label="Log out"
                >
                    <IoLogOutOutline/>
                    <span>Log out</span>
                </button>
            </div>
        </header>
    );
}