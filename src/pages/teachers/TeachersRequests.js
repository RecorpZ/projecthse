import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Doc from './uwu.jpg'



export const TeachersRequests = ( ) => { 
  // const [students, setStudents] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [studentsCompanies, setStudentsCompanies] = useState([]);
  useEffect(()=>{
      console.log("new line")
      // axios.get("https://hat-servers-insafyus.amvera.io/Students/")
      // .then(res => {setStudents(res.data); console.log(res.data)})
      // .catch(err => console.log(err))
      
      // axios.get("https://hat-servers-insafyus.amvera.io/Courses/")
      // .then(res => {setCourses(res.data); console.log(res.data)})
      // .catch(err => console.log(err))

      axios.get("https://hat-servers-insafyus.amvera.io/StudentsCompanies/normal")
      .then(res => {setStudentsCompanies(res.data); console.log(res.data)})
      .catch(err => console.log(err))
  },[]);

  async function updateStudentsCompanies(_idStudent, _company, _priority, _status) {
    await axios.put(`https://hat-servers-insafyus.amvera.io/StudentsCompanies/${_idStudent}/${_company}`, {idStudent: _idStudent, idCompany: _company, priority: _priority, status: _status})
    .then(res => {console.log(res)})
    .catch(err => console.log(err))
  }

  async function getPhoto(e) {
    await axios.get("https://hat-servers-insafyus.amvera.io/downloads", {responseType: 'blob'})
    .then(res => {
      const blob = res.data
      const downloadURL = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = 'cute picture.jpg'
          document.body.appendChild(link);
          link.click();
          link.remove();
    })
    .catch(err => console.log(err))
  }

  const navigate = useNavigate();
  // debugger;
  return (
    <div>
      {/* <div> */}
      {/* </div> */}
      {/* <a href={Doc}
        download='cute picture'
        target='_blank'
        rel="noreferrer">
          <button>Dongeload</button>
      </a> */}
      <button onClick={getPhoto}>Dongeload</button>
      <div>
      {/* <img src="https://i.pinimg.com/736x/49/c4/99/49c499390ea5b29bd9afddce1bf58a2b.jpg"/> */}
        <table border="2px" border-collapse="collapse">
          <thead>
            <tr>
              <th>Студент</th>
              <th>Своя компания?</th>
              <th>Приоритет 1</th>
              <th>Приоритет 2</th>
              <th>Приоритет 3</th>
            </tr>
          </thead>
          <tbody>
            {studentsCompanies.map((sc, index) => {
              return <tr key={index}>
                <td>{sc.name}</td>
                <td>{sc.ownCompany === 1 ? "+" : "-"}</td>
                <td>{sc.ownCompany === 0 ? <div>
                  <p style={{color: "#888888", margin: "0px"}}>{sc.Company1Name}</p>
                  <select value={sc.Company1Status} style={{background: sc.Company1Status === 1 ? "#99e9ff" : sc.Company1Status === 2 ? "#ffa5a6" : sc.Company1Status === 3 ? "#10ff4d" : "#FFFFFF"}} onChange={e => {setStudentsCompanies(studentsCompanies.map(sc1 => {
                    if (sc1.idStudent === sc.idStudent) {
                      return {...sc1, Company1Status: Number(e.target.value)};
                    } else {
                      return sc1;
                    }
                  })); console.log(studentsCompanies[index]); updateStudentsCompanies(studentsCompanies[index].idStudent, studentsCompanies[index].Company1, 1, Number(e.target.value))}}>
                    <option value={0}>Рассмотрение</option>
                    <option value={1}>Собеседование</option>
                    <option value={2}>Отказ</option>
                    <option value={3}>Принят</option>
                  </select></div> : ""}</td>
                <td>{sc.ownCompany === 0 ? <div>
                  <p style={{color: "#888888", margin: "0px"}}>{sc.Company2Name}</p>
                  <select value={sc.Company2Status} style={{background: sc.Company2Status === 1 ? "#99e9ff" : sc.Company2Status === 2 ? "#ffa5a6" : sc.Company2Status === 3 ? "#10ff4d" : "#FFFFFF"}} onChange={e => {setStudentsCompanies(studentsCompanies.map(sc1 => {
                    if (sc1.idStudent === sc.idStudent) {
                      return {...sc1, Company2Status: Number(e.target.value)};
                    } else {
                      return sc1;
                    }
                  })); updateStudentsCompanies(sc.idStudent, sc.Company2, 2, Number(e.target.value))}}>
                    <option value={0}>Рассмотрение</option>
                    <option value={1}>Собеседование</option>
                    <option value={2}>Отказ</option>
                    <option value={3}>Принят</option>
                  </select></div> : ""}</td>
                <td>{sc.ownCompany === 0 ? <div>
                  <p style={{color: "#888888", margin: "0px"}}>{sc.Company3Name}</p>
                  <select value={sc.Company3Status} style={{background: sc.Company3Status === 1 ? "#99e9ff" : sc.Company3Status === 2 ? "#ffa5a6" : sc.Company3Status === 3 ? "#10ff4d" : "#FFFFFF"}} onChange={e => {setStudentsCompanies(studentsCompanies.map(sc1 => {
                    if (sc1.idStudent === sc.idStudent) {
                      return {...sc1, Company3Status: Number(e.target.value)};
                    } else {
                      return sc1;
                    }
                  })); updateStudentsCompanies(sc.idStudent, sc.Company3, 3, Number(e.target.value))}}>
                  <option value={0}>Рассмотрение</option>
                  <option value={1}>Собеседование</option>
                  <option value={2}>Отказ</option>
                  <option value={3}>Принят</option>
                  </select></div> : ""}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

