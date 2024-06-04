import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Regist = ( ) => {
  const navigate = useNavigate(); 
    const onFinish = e => {
      e.preventDefault();
      const role = e.target.urole.value;
      const first_name = e.target.ufirst_name.value;
      const second_name = e.target.usecond_name.value;
      const last_name = e.target.ulast_name.value;
      const login = e.target.ulogin.value;
      const password = e.target.upassword.value;
      axios.post("http://localhost:3001/user/regAcc", {role,first_name,second_name,last_name,login,password})
      .then(res =>{
        if(res.data === "allmail"){
          alert("Аккаунт с этой почтой уже существует") 
        }
        else{
          navigate('/login');
        }
      })
    }
    return (
      <form class='form-login' onSubmit={onFinish}>
        <h3>Регистрация аккаунта</h3>
        <div className="mb-3">
          <label>Роль</label>
          <div>
            <input type="radio" id="teacher" name="urole" value="Teacher" checked />
            <label for="teacher">Teacher</label>
          </div>
          <div>
            <input type="radio" id="student" name="urole" value="Student" checked />
            <label for="Student">Student</label>
          </div>
        </div>

        <div className="mb-3">
          <label>Имя</label>
          <input
            required
            name = "ufirst_name"
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
            name = "ulast_name"
            minLength={2}
           className="form-control"
           placeholder="Введите фамилию" />
        </div>
        
        <div className="mb-3">
          <label>Отчество</label>
          <input
            required
            name = "usecond_name"
            minLength={2}
            type="text"
            className="form-control"
            placeholder="Введите Отчество"
          />
        </div>

        <div className="mb-3">
          <label>Логин</label>
          <input
            required
            name = "ulogin"
            minLength={2}
            type="text"
            className="form-control"
            placeholder="Введите имя"
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