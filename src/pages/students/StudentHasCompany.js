import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentHasCompany = ( ) => {
    const [hasCompany, setHasCompany] = useState([]);

    const idStudent = localStorage.getItem('UserId'); 

    const navigate = useNavigate(); 
    const onFinish = e => {
      e.preventDefault();
      // установить значение, есть ли компания
      axios.put("http://localhost:3001/students/setOwnCompany/"+idStudent, {hasCompany})
      .catch(err => {console.log(err); return;});
      
      // установить шаг
      let step = hasCompany == 1 ? 1 : 6;
      axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
      .then(navigate('/student/'))
      .catch(err => console.log(err));
    }
    
    const handleHasCompany = (event) => {
      setHasCompany(event.target.value);
    };

    return (
      <form class='form-login' onSubmit={onFinish}>
        <div className="mb-3">
          <fieldset>
            <label className="mb-3">У меня есть компания, которая согласна взять меня на практику. Компания согласна заключить договор с НИУ ВШЭ.</label>
            <div>
              <input type="radio" id="yes" name="hascompany" value="1" onChange={handleHasCompany} />
              <label for="yes">Да</label>
            </div>
            <div>
              <input type="radio" id="no" name="hascompany" value="0" onChange={handleHasCompany} />
              <label for="no">Нет</label>
            </div>
            <button type="submit" className="btn btn-success">Далее</button>
          </fieldset>
        </div>
      </form>
    )
}