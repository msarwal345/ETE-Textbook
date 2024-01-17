import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home'
import Signup from './component/Signup';
import Login from './component/Login';
import UploadTextbook from './component/Uploadfile/UploadFile';
import TextbookList from './component/Textbooklist/TextBooklist';
import AboutSection from './component/AboutSection/About';
import Layout from './component/Layout/Layout';
import ContactUs from './component/Contact/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/upload" element={<UploadTextbook />} />
        <Route path='/textbooks' element={<TextbookList />}></Route>
        <Route path='/about' element={<AboutSection/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        
      </Routes>
    </Router>
  );
}

export default App;
