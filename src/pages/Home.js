import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Home = ( ) => { 
const role = localStorage.getItem('Role');
const navigate = useNavigate(); 

if (role == "student"){
  setTimeout(() => {
    navigate('/student',{ replace: true });
    window.location.reload();
    }, 500);
}
if (role == "teacher"){
  setTimeout(() => {
    navigate('/',{ replace: true });
    window.location.reload();
    }, 500);
}

    return (
      <div>
        <p>{}</p>
      </div>
    )
  
}

