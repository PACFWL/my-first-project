import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../styles/dashboard/sidebar.module.css";
import { FaMusic, FaUser, FaGuitar, FaList, FaPlus, FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button className={styles.toggle} onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </button>

      {!isCollapsed && <h3 className={styles.title}>Dashboard</h3>}

      <nav className={styles.menu}>
        <div className={styles.section}>
          {!isCollapsed && <span className={styles.sectionTitle}>Músicas</span>}
          <button onClick={() => router.push("/music/list")} className={styles.navItem}>
            <FaMusic /> {!isCollapsed && "Lista de Músicas"}
          </button>
          <button onClick={() => router.push("/music/paged")} className={styles.navItem}>
            <FaList /> {!isCollapsed && "Listagem de Músicas"}
          </button>
          <button onClick={() => router.push("/music/add")} className={styles.navItem}>
            <FaPlus /> {!isCollapsed && "Adicionar Música"}
          </button>
        </div>
        <div className={styles.section}>
          {!isCollapsed && <span className={styles.sectionTitle}>Artistas</span>}
          <button onClick={() => router.push("/artists")} className={styles.navItem}>
            <FaGuitar /> {!isCollapsed && "Artistas"}
          </button>
        </div>
        <div className={styles.section}>
        {!isCollapsed && <span className={styles.sectionTitle}>Gerenciamento</span>}
          <button onClick={() => router.push("/users")} className={styles.navItem}>
            <FaUser /> {!isCollapsed && "Usuários"}
          </button>
        </div>
      </nav>
    </div>
  );
}
