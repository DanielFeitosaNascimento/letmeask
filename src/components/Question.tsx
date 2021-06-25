
import { ReactNode } from 'react';
import '../styles/components/Question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode 
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

const Question = ({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <div
      className={`question
      ${isAnswered
      ?
      'answered'
      :
      ""}
      ${isHighlighted && !isAnswered
      ?
      'highlighted'
      :
      ""}`}
    >
      <p>{content}</p>
      <footer>
        <div className="userInfo">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question;