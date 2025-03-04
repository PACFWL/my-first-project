import { useRouter } from "next/navigation";
import { FaUserCircle, FaCog } from "react-icons/fa";
import styles from "../../styles/dashboard/navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <div className={styles.profileMenu}>
        <button onClick={() => router.push("/profile")} className={styles.navItem}>
          <FaUserCircle className={styles.icon} /> Meu Perfil
        </button>
        <button onClick={() => router.push("/settings")} className={styles.navItem}>
          <FaCog className={styles.icon} /> Configurações
        </button>
      </div>
    </div>
  );
}