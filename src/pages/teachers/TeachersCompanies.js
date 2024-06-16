import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export const TeachersCompanies = ( ) => { 
  const [companies, setCompanies] = useState([]);
  const [courses, setCourses] = useState([]);
  const [companiesCourses, setCompaniesCourses] = useState([]);
  useEffect(()=>{
      console.log("new line")
      axios.get("http://localhost:3001/Companies/")
      .then(res => {setCompanies(res.data); console.log(res.data)})
      .catch(err => console.log(err))
      
      axios.get("http://localhost:3001/Courses/")
      .then(res => {setCourses(res.data); console.log(res.data)})
      .catch(err => console.log(err))

      axios.get("http://localhost:3001/CompaniesCourses/")
      .then(res => {setCompaniesCourses(res.data); console.log(res.data)})
      .catch(err => console.log(err))
  },[]);

  const navigate = useNavigate(); 

  const getCourseNameByCompany = (company) => {
    let course = companiesCourses.find(cc => cc.idCompany === company.id).idCourse
    if (!course) return "null"
    
  }

  return (
    <div>
      <div>
        <nav text-align="center">
          <img sourse="public/logoHse.svg"/>
        </nav>
      </div>
      <div>
        <table>
          <thead>
            <th>Компания</th>
            <th>Контакты</th>
            <th>Направление</th>
            <th>Кол-во мест</th>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              return <tr key={index}>
                <td>{company.name}</td>
                <td>{company.contacts}</td>
                {/* <td>{courses.find(course => course.id === companiesCourses.find(cc => cc.idCompany === company.id)).name}</td> */}
                <td>0</td>
                <td>{company.places}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

