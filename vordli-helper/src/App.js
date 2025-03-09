import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home'
import Layout from './Layout'
import NotFound from './NotFound';

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div className="App">
          <Routes>
            <Route path="/" element={ <Layout /> }> 
              <Route index element={ <Home /> } />
              <Route path="*" element={ <NotFound /> } />
            </Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
