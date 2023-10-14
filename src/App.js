// import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState'
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
    return (
        <NoteState>
            <Router>
                <Navbar key="navbar" />
                <Alert type="primary" message="hi i am a boss"/>

                <Routes>
                    <Route exact path='/' element={<Home key="home"/>} />
                    <Route exact path='/about' element={<About key="about"/>} />
                    <Route exact path='/login' element={<Login key="login"/>} />
                    <Route exact path='/sign-up' element={<SignUp key="sign-up"/>} />
                </Routes>
            </Router>
        </NoteState>
    );
}

export default App;
