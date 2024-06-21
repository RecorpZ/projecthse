import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentApplicationsStatus = ( ) => {
    const [companies, setCompanies] = useState([]);
    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();
    useEffect(() => {
      // TODO get companies with priority 1-3
      axios.post("http://localhost:3001/companies/getCompaniesStatusesByIdStudent",{idStudent})
      .then(result => { 
        setCompanies(result.data); 
        companies = result.data;
        console.log(companies); 
        // установить шаг
        let step;
        console.log(companies);
        if (companies[0].status == 2 && (companies.length < 2 || companies[1].status == 2) && (companies.length < 3 || companies[2].status == 2))
          step = 7;
        else if ((companies[0].status != 0 && companies[0].status != 1 && (companies.length < 2 || companies[1].status != 0 && companies[1].status != 1) && (companies.length < 3 || companies[2].status != 0 && companies[2].status != 1)))
          step = 9
        else return;
        axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
        .then(navigate('/student/'))
        .catch(err => console.log(err));
      })
      .catch(err => {console.log(err); return;});
      }, [idStudent]);

    return (
      <form>
        <h1 align="center">Состояние заявок</h1>
        <div className="mb-3">
            {companies.map(company => {
                return <form class='form-login mb-3' style={{width: "800px"}}>
                  <table>
                    <tr>
                      <th>
                        <h3>
                          Компания: <b>{company.name}</b>.
                        </h3>
                        <h5>
                          Приоритет: <b>{company.priority}</b>.
                        </h5>
                        <h5>
                          Состояние заявки: <b>{["на рассмотрении", "собеседование", "отклонена", "одобрена"][company.status]}</b>.
                        </h5>
                      </th>
                    <th>
                      {company.status == 0 &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="gray" class="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                      </svg>}
                      {company.status == 1 &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="blue" class="bi bi-calendar3" viewBox="0 0 16 16">
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>}
                      {company.status == 2 &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="red" class="bi bi-x-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>}
                      {company.status == 3 &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" class="bi bi-check-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>}
                    </th>
                    </tr>
                  </table>
                </form>;
            })}
        </div>
      </form>
    )
}