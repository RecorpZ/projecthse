import React, { Component} from 'react'
import axios from 'axios'

export default class Regist extends Component {
  render() {
    const onFinish = e => {
      const name = e.target.uname.value;
      const nickname = e.target.unickname.value;
      const email = e.target.uemail.value;
      const password = e.target.upassword.value;
      axios.post("http://localhost:3001/regAcc", {name,nickname,email,password})
      .then(res =>{
        if(res.data === "allmail"){
          alert("Аккаунт с этой почтой уже существует") 
        }
      })
    }
    return (


      <form class='form-login' onSubmit={onFinish}>
        <h3>Регистрация аккаунта</h3>
        <div className="mb-3">
          <label>Имя</label>
          <input
            required
            name = "uname"
            minLength={2}
            type="text"
            className="form-control"
            placeholder="Введите имя"
          />
        </div>

        <div className="mb-3">
          <label>Фамилия</label>
          <input 
            type="text"
            required
            name = "unickname"
            minLength={2}
           className="form-control"
           placeholder="Введите фамилию" />
        </div>

        <div className="mb-3">
          <label>Электронная почта</label>
          <input
            required
            name = "uemail"
            minLength={3}
            type="email"
            className="form-control"
            placeholder="Введите почту"
          />
        </div>

        <div className="mb-3">
          <label>Пароль</label>
          <input
            required
            name = "upassword"
            minLength={3}
            type="password"
            className="form-control"
            placeholder="Введите пароль"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </div>
        <p className="forgot-password text-right">
          Уже зарегистрированы ?<a href="/login">Войти</a>
        </p>
      </form>
    )
  }
}