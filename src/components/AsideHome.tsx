import illustrating from '../assets/illustration.svg';
import styles from '../styles/components/AsideHome.module.scss';

export function AsideHome() {
  return (
    <aside  className={styles.container}>
      <img src={illustrating} alt="" />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire suas dúvidas da sua audiência em tempo real</p>
    </aside>
  )
}