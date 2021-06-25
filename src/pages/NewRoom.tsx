import useAuth from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import {AsideHome} from '../components/AsideHome';
import Button from '../components/Button';
import logoImage from '../assets/logo.svg';
import styles from '../styles/pages/newRoom.module.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';


const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  const handlerCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      userId: user?.id,
      email: user?.email,
    })

    history.push(`admin/rooms/${firebaseRoom.key}`);
  }


  return  (
    <div className={styles.pageNewRoom} >

      <AsideHome />

      <main>
        <div>
          <img  className={styles.logoImage} src={logoImage} alt="LetmeAsk" />
          {user?.name ? (
            <strong>{`💜 Hi! ${user?.name}`}</strong>
          ) : (null)}
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handlerCreateRoom}>
            <input
              className={styles.input}
              aria-autocomplete="both"
              onChange={(event) => {setNewRoom(event.target.value)}}
              value={newRoom}
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit" >
              Criar Sala
            </Button>  
          </form>
          <p>
            Quer entrar em uma sala já existente?
            <Link to="/">
              Clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom;