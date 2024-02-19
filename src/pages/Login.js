import React, { Component} from 'react'
import axios from "axios"


export const Login = ( ) => {
 const OnFinish = e => {
    e.preventDefault();
    const email = e.target.uemail.value;
    const password = e.target.upassword.value;
    axios.post("http://localhost:3001/loginAcc",{email, password})
    .then(res =>{
      console.log(res.data)
      if(res.data === "AccountConfirmed"){
        console.log("Вход выполнен") 

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
            <label>Электронная почта</label>
            <input
              minLength={3}
              required
              name = "uemail"
              type="email"
              className="form-control"
              placeholder="Напишите адрес"
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
  
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Запомнить меня
              </label>
            </div>
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
