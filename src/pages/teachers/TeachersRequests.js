import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export const TeachersRequests = ( ) => { 
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [companiesCourses, setCompaniesCourses] = useState([]);
  useEffect(()=>{
      console.log("new line")
      axios.get("http://localhost:3001/Students/")
      .then(res => {setStudents(res.data); console.log(res.data)})
      .catch(err => console.log(err))
      
      axios.get("http://localhost:3001/Courses/")
      .then(res => {setCourses(res.data); console.log(res.data)})
      .catch(err => console.log(err))

      axios.get("http://localhost:3001/CompaniesCourses/")
      .then(res => {setCompaniesCourses(res.data); console.log(res.data)})
      .catch(err => console.log(err))
  },[]);

  const navigate = useNavigate(); 

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
            <th>Студент</th>
            <th>Своя компания?</th>
            <th>Приоритет 1</th>
            <th>Приоритет 2</th>
            <th>Приоритет 3</th>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return <tr key={index}>
                <td>{student.name}</td>
                <td>{student.contacts}</td>
                {/* <td>{courses.find(course => course.id === companiesCourses.find(cc => cc.idCompany === company.id)).name}</td> */}
                <td>0</td>
                <td>{student.places}</td>
                <td>asd</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

