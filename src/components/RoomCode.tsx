import styles from '../styles/components/RoomCode.module.scss';
import copyImage from '../assets/copy.svg';

type RoomCodeProps = {
  code: string;
}

const RoomCode = (props: RoomCodeProps) => {
  const CopyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(`${props.code}`)
  }


  return (
    <button onClick={CopyRoomCodeToClipBoard} className={styles.roomCode}>
      <div>
        <img src={copyImage} alt="Copy room code" />
      </div>
      <span><strong>#</strong> {props?.code}</span>
    </button>
  )
}

export default RoomCode;