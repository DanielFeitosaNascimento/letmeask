import { useHistory } from 'react-router-dom';
import { AsideHome } from '../components/AsideHome';
import Button from '../components/Button';
import styles from '../styles/pages/home.module.scss';
import { FiLogIn } from 'react-icons/fi';
import logoImage from '../assets/logo.svg';
import logoImageGoogle from '../assets/google-icon.svg';
import useAuth from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';


export default function Home() {
  const history = useHistory();
  const { signInWithPopupGoogle, user } = useAuth();
  const [roomId, setRoomId] = useState('');

  const handlerCreateRoom = () => {
    if (!user) {
      signInWithPopupGoogle();
    }

    history.push('/rooms/new');
  }

  const handlerJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomId.trim() === '') {
      return
    }

    const roomRef = database.ref(`rooms/${roomId}`).get();

    if (!(await roomRef).exists()) {
      alert('Sala não encontrada!');
      return
    }

    if ((await roomRef).val().endedAt) {
      alert('Sala Encerrada')
      return;
    }

    history.push(`/rooms/${roomId}`);

  }

  return (
    <div className={styles.pageAuth} >

      <AsideHome />

      <main>
        <div>
          <img  className={styles.logoImage} src={logoImage} alt="LetmeAsk" />
          <button onClick={() => {handlerCreateRoom()}} className={styles.btnGoogle}>
            <img src={logoImageGoogle} alt="Google" />
            Crie sua sala com Google
          </button>
          <div  className={styles.separator}>
            ou entre em uma sala
          </div>
          <form onSubmit={handlerJoinRoom}>
            <input
              className={styles.input}
              aria-autocomplete="both"
              onChange={(event) => {setRoomId(event.target.value)}}
              value={roomId}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit" >
              <FiLogIn size={20} />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}