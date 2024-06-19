import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';



export const TeachersCompaniesUpdate = () => {
    const navigate = useNavigate(); 
    const [companiesCourses, setCompaniesCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const {idCourse, idCompany} = useParams();
    useEffect(()=>{
        console.log("new line");
        console.log([idCourse, idCompany])
        getCC();
    },[]);

    async function getCC() {
      await axios.get(`http://localhost:3001/CompaniesCourses/normal/${idCompany}/${idCourse}`)
      .then(res => {setCompaniesCourses(res.data[0]); console.log(res.data[0])})
      .catch(err => console.log(err))
  
      await axios.get("http://localhost:3001/Courses")
      .then(res => {setCourses(res.data); console.log(res.data)})
      .catch(err => console.log(err))
    }

    function goHome(e) {
        navigate("/teacherscomp");
    }

    async function handleSumbit(e) {
        // await axios.put(`http://localhost:3001/Courses/${idCourse}`, {name: companiesCourses.name})
        // .then(res => {console.log(res)})
        // .catch(err => console.log(err))
        // debugger
        await axios.put(`http://localhost:3001/Companies/${idCompany}`, {
            name: companiesCourses.CompName,
            contacts: companiesCourses.contact,
            places: companiesCourses.places
        })
        .then(res => {console.log(res); goHome(e)})
        .catch(err => console.log(err))
        // debugger
        console.log("Saved!");
        goHome(e);
        navigate("/teacherscomp");
    }

    return (
        <div>
            <form onSubmit={handleSumbit} onAbort={goHome}>
                <div>
                    <label>Название компании </label>
                    <input type='text' value={companiesCourses.CompName} onChange={e => {setCompaniesCourses({...companiesCourses, CompName: e.target.value})}}/>
                </div>
                <div>
                    <label>Контакты</label>
                    <input type='email' value={companiesCourses.contact} onChange={e => {setCompaniesCourses({...companiesCourses, contact: e.target.value})}}/>
                </div>
                <div>
                    <label>Направление</label>
                    <select value={companiesCourses.idCourse} onChange={e => {setCompaniesCourses({...companiesCourses, idCourse: e.target.value})}}>
                        {courses.map((course, index) => {
                        return <option value={course.id} key={course.id}>{course.name}</option>
                    })}
                    </select>
                </div>
                <div>
                    <label>Количество мест</label>
                    <input type='number' min="0" value={companiesCourses.places} onChange={e => {setCompaniesCourses({...companiesCourses, places: e.target.value})}}/>
                </div>
                <div>
                    <input type='submit' value="Сохранить"/>
                    <button type='cancel' onClick={goHome}>Отменить</button>
                </div>
            </form>
        </div>
    )
}