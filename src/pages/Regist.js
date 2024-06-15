import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Regist = ( ) => {
  const [role, setRole] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
      axios.get("http://localhost:3001/courses/")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err))
  },[]);

  const navigate = useNavigate(); 
    const onFinish = e => {
      e.preventDefault();
      const role = e.target.urole.value;
      const first_name = e.target.ufirst_name.value;
      const second_name = e.target.usecond_name.value;
      const last_name = e.target.ulast_name.value;
      const login = e.target.ulogin.value;
      const password = e.target.upassword.value;
      let courseId = 0;
      if (role === "student"){
        courseId = e.target.ucourse.value;
      }
      axios.post("http://localhost:3001/user/register", {role,first_name,second_name,last_name,login,password,courseId})
      .then(res =>{
        if(res.data === "allmail"){
          alert("Аккаунт с этой почтой уже существует") 
        }
        else{
          navigate('/login');
        }
      })
    }
    
    const handleRole = (event) => {
      setRole({...role, role: event.target.value});
    };

    return (
      <form class='form-login' onSubmit={onFinish}>
        <h3>Регистрация аккаунта</h3>
        <div className="mb-3">
          <label>Роль</label>
          <div>
            <input type="radio" id="teacher" name="urole" value="teacher" onChange={handleRole} />
            <label for="teacher">Teacher</label>
          </div>
          <div>
            <input type="radio" id="student" name="urole" value="student" onChange={handleRole} />
            <label for="student">Student</label>
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
            minLength={6}
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

        {role.role === "student" &&  
          <div className="mb-3">
            <label>Курс</label>
            <select name="ucourse">
              {courses.map((course, index) => {
                return <option value={course.id}>{course.name}</option>
              })}
            </select>
          </div>
        }

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