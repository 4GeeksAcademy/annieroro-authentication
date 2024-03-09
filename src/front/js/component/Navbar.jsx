import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {store.isLogin ? 
            <Link to="/profile">
              <button className="btn btn-secondary me-3">Perfil</button>
            </Link>
          : ''}
          <Link to="/sign-up">
            <button className="btn btn-primary me-3">Sign Up</button>
          </Link>
          <Link to={store.isLogin ? "/" : "/login"}>
            <button className="btn btn-success" onClick={actions.logout}>{store.isLogin ? "Logout" : "Login" }</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
