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
import {useState} from 'react'

function App() {
    const [alert, setAlert] = useState(null)

    // method to show alert
    const showAlert = (message, tag) => {
        setAlert({
            msg: message,
            tag: tag
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }

    return (
        <NoteState>
            <Router>
                <Navbar key="navbar" />
                <div className="container">
                    <Alert alert={alert}></Alert>

                    <Routes>
                        <Route exact path='/' element={<Home key="home" showAlert={showAlert} />} />
                        <Route exact path='/about' element={<About key="about"/>} />
                        <Route exact path='/login' element={<Login key="login" showAlert={showAlert} />} />
                        <Route exact path='/sign-up' element={<SignUp key="sign-up" showAlert={showAlert} />} />
                    </Routes>
                </div>
            </Router>
        </NoteState>
    );
}

export default App;
