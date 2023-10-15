import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        // API CALL
        // const host = window.location.host
        const host = "http://127.0.0.1:5000"
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const resJson = await response.json();
        console.log(resJson)
        if (resJson.success){
            localStorage.setItem("token", resJson.authToken)
            navigate("/")
            props.showAlert("Sign Up Successful!", "success")
        } else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5'>
            <h2 className='my-4'>Create New Account in iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" value={credentials.name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} minLength={"5"}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} minLength={"5"}/>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}
