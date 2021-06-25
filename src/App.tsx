import { AuthContextProvider } from './contexts/AuthContext'

import Router from './router';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
