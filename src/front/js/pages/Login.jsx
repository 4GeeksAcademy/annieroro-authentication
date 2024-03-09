import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store, actions} = useContext(Context);
  

    const handleOnClick = async (event) =>{
        event.preventDefault();
        const dataToSend = {
            email: email,
            password: password
        }
        const url = process.env.BACKEND_URL + '/api/login'
        const options = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url,options);
        if (!response.ok){
            console.log('error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        actions.login(data.results);
        localStorage.setItem('token', data.access_token)
       
    }

    return (
       store.isLogin ? <Navigate to='/dashboard'/> :
        <div className="col-8 m-auto">
            <h1 className="text-primary m-2">Log In</h1>
            <form onSubmit={handleOnClick}>        
                <div className="row mt-3 ">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-6">
                        <input  type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3 ">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" >Password</label>
                    <div className="col-sm-6">
                        <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>     
            </form>
        </div>        
    );
};