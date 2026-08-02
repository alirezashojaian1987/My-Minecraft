import styles from "./Header.module.scss";
import Minecraft_logo from "../../assets/images/mc_logo.png";
import { IoMenuOutline } from "react-icons/io5";

interface HeaderProps{
    onToggleSidebar?:()=>void;
}

export default function Header({onToggleSidebar}:HeaderProps){
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

            <div className={styles.Right_placeholder}></div>
        </header>
    );
}