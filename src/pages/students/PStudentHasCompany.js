import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const PStudentHasCompany = ( ) => {
    const [hasCompany, setHasCompany] = useState([]);

    const idStudent = localStorage.getItem('UserId'); 

    const navigate = useNavigate(); 
    const onFinish = e => {
      e.preventDefault();
      axios.put("http://localhost:3001/students/"+idStudent, {hasCompany})
      .then(navigate('/student/attachcard'))
      .catch(err => console.log(err));
    }
    
    const handleHasCompany = (event) => {
      setHasCompany(event.target.value);
    };

    return (
      <form class='form-login' onSubmit={onFinish}>
        <h3>Регистрация аккаунта</h3>
        <div className="mb-3">
          <label>У меня есть компания, которая согласна взять меня на практику. Компания согласна заключить договор с НИУ ВШЭ.</label>
          <div>
            <input type="radio" id="yes" name="uyes" value="1" onChange={handleHasCompany} />
            <label for="yes">Да</label>
          </div>
          <div>
            <input type="radio" id="no" name="uno" value="0" onChange={handleHasCompany} />
            <label for="no">Нет</label>
          </div>
          <button type="submit" className="btn btn-success">Далее</button>
        </div>
      </form>
    )
}