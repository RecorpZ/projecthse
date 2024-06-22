import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';



export const TeachersCompanies = ( ) => { 
  const [companiesCourses, setCompaniesCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
      console.log("new line");
      getCC();
  },[]);

  async function getCC() {
    await axios.get("http://localhost:3001/CompaniesCourses/normal")
    .then(res => {setCompaniesCourses(res.data); console.log(res.data)})
    .catch(err => console.log(err))

    await axios.get("http://localhost:3001/Courses")
    .then(res => {setCourses(res.data); console.log(res.data)})
    .catch(err => console.log(err))
  }

  const navigate = useNavigate(); 

  async function addBond(e) {
    let idNewCourse = 1;
    // await axios.post("http://localhost:3001/Courses/", {name: "new"})
    // .then(res => {idNewCourse = res.data[0]["last_insert_rowid()"]; console.log(res)})
    // .catch(err => console.log(err))

    let idNewCompany = -1;
    await axios.post("http://localhost:3001/Companies/", {name: "new", contacts: "", places: 0})
    .then(res => {idNewCompany = res.data[0]["last_insert_rowid()"]; console.log(res)})
    .catch(err => console.log(err))

    await axios.post("http://localhost:3001/CompaniesCourses/", {idCompany: idNewCompany, idCourse: idNewCourse})
    .then(res => {idNewCompany = res.data[0]; console.log(res)})
    .catch(err => console.log(err))
    console.log(idNewCourse)
    console.log(idNewCompany)
    getCC();
  }

  async function deleteRow(e) {
    console.log(e);
    await axios.delete(`http://localhost:3001/companiescourses/compcourse/${e.idCompany}/${e.idCourse}`)
    .then(res => {console.log(res.data)})
    .catch(err => console.log(err))
    await getCC();
  }

  return (
    <div>
      <link rel='stylesheet' type='text/css' href='style.css'/>
      <div>
        <nav text-align="center">
          <img sourse="public/logoHse.svg"/>
        </nav>
      </div>
      <div>
        <table border="2px" border-collapse="collapse">
          <thead>
            <tr>
              <th>Компания</th>
              <th>Контакты</th>
              <th>Направление</th>
              <th>Кол-во мест</th>
              <th>123</th>
            </tr>
          </thead>
          <tbody>
            {companiesCourses.map((cc, index) => {
              return <tr key={index}>
                <td>{cc.CompName}</td>
                <td>{cc.contact}</td>
                <td>{cc.CourseName}</td>
                <td>{cc.places}</td>
                <td>
                  <Link value={cc} to={`/teacherscompUpdate/${cc.idCompany}/${cc.idCourse}`}>Обновить</Link>
                  <button value={cc} onClick={(e) => deleteRow(cc)}>Удалить</button>
                </td>
              </tr>
            })}
            <tr>
              <td>
                <button onClick={addBond}>Добавить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

