import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentHasCompany = ( ) => {
    const [hasCompany, setHasCompany] = useState(0);

    const idStudent = localStorage.getItem('UserId'); 

    const navigate = useNavigate(); 

    useEffect(() => {
      // проверка шага
      axios.get("https://hat-servers-insafyus.amvera.io/students/getStep/"+idStudent)
      .then(res => {
          let step = res.data.step;
          if (step != 0) navigate('/student/');
        });
      });

    const onFinish = e => {
      e.preventDefault();
      // установить значение, есть ли компания
      hasCompany == 1 ? setHasCompany(1) : setHasCompany(0);
      axios.put("https://hat-servers-insafyus.amvera.io/students/setOwnCompany/"+idStudent, {hasCompany})
      .then(res => {
        // установить шаг
        let step = hasCompany == 1 ? 1 : 6;
        axios.put("https://hat-servers-insafyus.amvera.io/students/setStep/"+idStudent, {step})
        .then(res => {navigate('/student/');})
        .catch(err => console.log(err));
      })
      .catch(err => {console.log(err); return;});
      
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
              <input type="radio" id="no" name="hascompany" value="0" onChange={handleHasCompany} checked/>
              <label for="no">Нет</label>
            </div>
            <button type="submit" className="btn btn-success">Далее</button>
          </fieldset>
        </div>
      </form>
    )
}