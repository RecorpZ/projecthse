import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentAccepted = ( ) => {
    const [company, setCompany] = useState();
    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();
    
    useEffect(() => {
      // проверка шага
      axios.get("http://localhost:3001/students/getStep/"+idStudent)
      .then(res => {
          let step = res.data.step;
          if (step != 9) navigate('/student/');
        });

        // get company with accepted status and highest priority
        axios.post("http://localhost:3001/companies/getAcceptedCompanyByIdStudent",{idStudent})
        .then(res => { setCompany(res.data[0])});
      }, [idStudent]);

    return (
      <form class='form-login'>
        <table>
          <tr>
            <th>
              <div className="mb-3">
                <label>Вы приняты в компанию {company?.name}</label>
              </div>
            </th>
            <th>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" class="bi bi-check-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
              </svg>
            </th>
          </tr>
        </table>
      </form>
    )
}