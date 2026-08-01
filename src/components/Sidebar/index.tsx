import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../Constants/sidebarLinks";
import styles from "./Sidebar.module.scss";

export default function Sidebar(){
    return(
        <aside className={styles.Sidebar}>
            <nav className={styles.Navigation}>
                <ul className={styles.Nav_list}>
                    {sidebarLinks.map(({title, path, icon:Icon})=>(
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({isActive})=>
                                    isActive
                                        ? `${styles.Nav_link} ${styles.Active}`
                                        : styles.Nav_link
                                }
                                end={path==="/"}
                            >
                                <Icon className={styles.Icon}/>

                                <span>{title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <footer className={styles.Footer}>
                Mine Panel v1.0
            </footer>
        </aside>
    );
}