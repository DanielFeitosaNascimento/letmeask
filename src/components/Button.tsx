import { ButtonHTMLAttributes } from 'react'
import styles from '../styles/components/Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

const Button = ({ isOutlined = false , ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isOutlined ? 'outlined' : ''}`} {...props}>
      
    </button>
  )
}

export default Button;
