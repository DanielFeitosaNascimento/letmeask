import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import { database } from '../services/firebase';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import deleteImage from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';
import styles from '../styles/pages/adminRoom.module.scss';
import logoImage from '../assets/logo.svg';

import useRoom from '../hooks/useRoom';


type ParamsProps = {
  id: string
}




const AdminRoom: React.FC = () => {
  // const {user} = useAuth()
  const history = useHistory();
  const params = useParams<ParamsProps>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  const handlerEndRoom = async (roomId: string) => {
    if (window.confirm('Tem certeza que quer, encerrar a sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })

      history.push('/')
    }
  }

  const handlerDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
    
  }

  const handlerCheckQuestionAsAnswer = async (questionId: string) => {
    if (window.confirm('Confirmar sua realização?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
        information: {
          date: new Date(),
          action: 'Realizada',
        }
      });
    }
  }

  const handlerHighlightQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja priorizar este item?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
        information: {
          date: new Date(),
          action: 'Priorizada'
        }
      });
    }
  }

  return (
    <div className={styles.pageRoomAdmin} >
      <header>
        <div className={styles.content}>
          <img src={logoImage} alt="Letmeask" />
          <div>
            <RoomCode code={params.id} />
            <Button onClick={() => {handlerEndRoom(roomId)}} className={styles.buttonEndRoom} >Encerra Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle} >
          <strong>
            Sala
          </strong>
          <FiArrowRight size={22} />
          <h1>
            {title}
          </h1>
          { questions.length !== 0 && <span><strong>{questions.length}</strong> pegunta(s)</span> }
        </div>

        {questions.map((question) => {
          return (
            <Question  
              content={question.content}
              author={question.author}
              key={question.id}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              { !question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => {handlerCheckQuestionAsAnswer(question.id)}}
                  >
                    <img src={checkImg} alt="Confirmar Resposta" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {handlerHighlightQuestion(question.id)}}
                  >
                    <img src={answerImg} alt="Destaque" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {handlerDeleteQuestion(question.id)}}
              >
                <img src={deleteImage} alt="Apagar" />
              </button>

            </Question>
          )
        })}
      </main>
    </div>
  )
}

export default AdminRoom;