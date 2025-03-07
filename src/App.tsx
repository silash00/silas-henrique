import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter basename="/silas-henrique">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
