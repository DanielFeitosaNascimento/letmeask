import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


export default function useAuth() {
  const use = useContext(AuthContext);

  return use;
}