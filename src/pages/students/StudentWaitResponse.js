import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentWaitResponse = ( ) => {
    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();
    useEffect(() => {
      // получить информацию есть ли файл
      let contractexists;
      axios.get("http://localhost:3001/documents/contractexists/"+idStudent)
      .then(res => {
        contractexists = res.data
        if (contractexists) {
          // установить шаг
          let step = 3;
          axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
          .then(navigate('/student/'))
          .catch(err => console.log(err));
        }})
      .catch(err => {console.log(err); return;});
      }, []);


    return (
      <form class='form-login'>
        <div className="mb-3">
          <table>
            <tr>
              <th>
                <label className="mb-3">Ожидайте получение договора от НИУ ВШЭ. Этот договор нужно будет отнести работодателю на подписание.</label>
              </th>
              <th>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                  <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                </svg>
              </th>
            </tr>
          </table>
        </div>
      </form>
    )
}