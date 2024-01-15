import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home'
import Signup from './component/Signup';
import Login from './component/Login';
import UploadTextbook from './component/Uploadfile/UploadFile';
import TextbookList from './component/Textbooklist/TextBooklist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/upload" element={<UploadTextbook />} />
        <Route path='/textbooks' element={<TextbookList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
