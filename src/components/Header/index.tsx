

import styles from "./Header.module.scss";
import Minecraft_logo from "../../assets/images/mc_logo.png";

export default function Header(){
    return(
        <header className={styles.Header}>
            <div className={styles.Logo_container}>
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