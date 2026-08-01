import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../Constants/sidebarLinks";
import styles from "./Sidebar.module.scss";

export default function Sidebar(){
    return(
        <aside className={styles.Sidebar}>
            <nav>
                {sidebarLinks.map(({title,path,icon:Icon})=>(
                    <NavLink key={path} to={path}>
                        <Icon/>
                        <span>{title}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}