import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {

    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            email: email,
            password: password,
            username: username,
            lastname: lastname
        }
        const url = process.env.BACKEND_URL + '/api/sign-up'
        const option = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, option);
        if (!response.ok) {
            console.log('error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="col-6 m-auto">
            <h1 className="m-2">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="row m-3">
                    <div className="col">
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="First name" aria-label="First name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={lastname} onChange={(event) => setLastname(event.target.value)} placeholder="Last name" aria-label="Last name" />
                    </div>
                </div>
                <div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} id="inputEmail3" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} id="inputPassword3" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Sign up
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">OK</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Te has registrado correctamente
                                </div>
                                <div className="modal-footer">
                                    <Link to='/'>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};