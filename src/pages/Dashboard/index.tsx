import {
    IoCubeOutline,
    IoMapOutline,
    IoVideocamOutline,
} from "react-icons/io5";

import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";

const quickLinks=[
    {
        title:"Aternos",
        subtitle:"Start server",
        icon:IoCubeOutline,
        url:"https://aternos.org",
    },

    {
        title:"Chunkbase",
        subtitle:"World tools",
        icon:IoMapOutline,
        url:"https://www.chunkbase.com",
    },

    {
        title:"Google Meet",
        subtitle:"Join call",
        icon:IoVideocamOutline,
        url:"https://meet.google.com",
    },
];

export default function Dashboard(){
    return(
        <div className={styles.Dashboard}>
            <section className={styles.Hero}>
                <h1>Dashboard</h1>
                <p>
                    Quick access to everything you need before jumping into your Minecraft world.
                </p>
            </section>

            <section className={styles.quick_links}>
                <h2>Quick access</h2>

                <div className={styles.card_grid}>
                    {quickLinks.map(({title,subtitle,icon:Icon,url})=>(
                        <Link
                            key={title}
                            to={url}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.link_card}
                        >
                            <Icon className={styles.Icon}/>

                            <h3>{title}</h3>

                            <span>{subtitle}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}