import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Create from './components/Create';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Note from './components/Note';
import About from './components/About';

import './App.css';


function App() {
  return (
    <div className="main">
      <h3>Crypto Power</h3>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path='/' element={<Main/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/about' element={<About/>}/>
          <Route exact path='/note/' element={<Note/>}/>
          <Route exact path='/note/:noteUrl' element={<Note/>}/> {/* это с параметрами - мы указываем что эти параметры мы будем рассматривать в компоненте Note */}
          <Route element={<Error/>} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
