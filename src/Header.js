import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:8000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">knowledge <span className="log">blog</span></Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="btn">Create</Link>
            <button onClick={logout} className="btnn">Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}