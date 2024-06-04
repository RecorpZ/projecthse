import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const Login = ( ) => {
const navigate = useNavigate(); 
 const OnFinish = e => {
    e.preventDefault();
    
    const login = e.target.ulogin.value;
    const password = e.target.upassword.value;

    // function getName() {
    //   axios.post("http://localhost:3001/getname",{email})
    //   .then(res =>{localStorage.setItem('UserName', res.data);})
    // }
    
    // function getNickname() {
    //   axios.post("http://localhost:3001/getnickname",{email})
    //   .then(res =>{localStorage.setItem('UserNickname', res.data);})
    // }

    axios.post("http://localhost:3001/user/loginAcc",{login, password})
    .then(res =>{
      console.log(res.data)
      if(res.data === "AccountConfirmed"){
        console.log("Вход выполнен") 
        // getName(email)
        // getNickname(email)

        localStorage.setItem('Token', "Pass");
        localStorage.setItem('UserLogin', login);
        setTimeout(() => {
        navigate('/',{ replace: true });
        window.location.reload();
        }, 500);
      }
      
      if(res.data === "NOAccount"){
        console.log("Нет аккаунта с такой почтой") 

      }
      if(res.data === "WrongPass"){
        console.log("Неправильный пароль") 

      } 
    })
  }
  return (
    <form class="form-login" onSubmit= {OnFinish}>
          <h3>Вход в аккаунт</h3>
          <div className="mb-3">
            <label>Логин</label>
            <input
              minLength={3}
              required
              name = "ulogin"
              type="text"
              className="form-control"
              placeholder="Напишите логин"
            />
          </div>

          <div className="mb-3">
            <label>Пароль</label>
            <input
              minLength={6}
              required
              name = "upassword"
              type="password"
              className="form-control"
              placeholder="Напишите пароль"
            />
          </div>
  
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" >
              Войти
            </button>
          </div>
            <p className="forgot-password text-right">
            Нет профиля ?  <a href="/reg">Создать аккаунт</a>         
          </p>
        </form>
  )
}
