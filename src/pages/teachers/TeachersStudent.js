import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export const TeachersStudent = ( ) => { 
  // const [students, setStudents] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [documents, setdocuments] = useState([]);
  useEffect(()=>{
      console.log("new line")

            axios.get("http://localhost:3001/Documents/")
            .then(res => {setdocuments(res.data); console.log(res.data)})
            .catch(err => console.log(err))

       axios.get("http://localhost:3001/Students/")
       .then(res => {setStudents(res.data); console.log(res.data)})
       .catch(err => console.log(err))
      
      // axios.get("http://localhost:3001/Courses/")
      // .then(res => {setCourses(res.data); console.log(res.data)})
      // .catch(err => console.log(err))

      // axios.get("http://localhost:3001/StudentsCompanies/normal")
      // .then(res => {setStudentsCompanies(res.data); console.log(res.data)})
      // .catch(err => console.log(err))
  },[]);

  async function updateStudentsCompanies(_idStudent, _company, _priority, _status) {
    await axios.put(`http://localhost:3001/StudentsCompanies/${_idStudent}/${_company}`, {idStudent: _idStudent, idCompany: _company, priority: _priority, status: _status})
    .then(res => {console.log(res)})
    .catch(err => console.log(err))
  }
  function downloadresume(idStudent) {
        axios.get("http://localhost:3001/documents/downloadcontract/"+idStudent, {responseType: 'blob'})
      .then(res => {
        const blob = res.data;
        // console.log(res.data);
        const downloadURL = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'file.jpg';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(e => console.error('Ошибка при скачивании файла:', e));
  }

  function downloadfactorycard(idStudent) {
    axios.get("http://localhost:3001/documents/downloadcontract/"+idStudent, {responseType: 'blob'})
  .then(res => {
    const blob = res.data;
    // console.log(res.data);
    const downloadURL = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'file.jpg';
    document.body.appendChild(link);
    link.click();
    link.remove();
  })
  .catch(e => console.error('Ошибка при скачивании файла:', e));
}

function downloadcontract(parma) {
 const idStudent = parma
  axios.get("http://localhost:3001/documents/downloadcontract/"+idStudent, {responseType: 'blob'})
.then(res => {
  const blob = res.data;
  // console.log(res.data);
  const downloadURL = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = 'file.jpg';
  document.body.appendChild(link);
  link.click();
  link.remove();
})
.catch(e => console.error('Ошибка при скачивании файла:', e));
}

function downloadsigncontract(idStudent) {
  axios.get("http://localhost:3001/documents/downloadcontract/"+idStudent, {responseType: 'blob'})
.then(res => {
  const blob = res.data;
  // console.log(res.data);
  const downloadURL = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = 'file.jpg';
  document.body.appendChild(link);
  link.click();
  link.remove();
})
.catch(e => console.error('Ошибка при скачивании файла:', e));
}
function a (){
  console.log("dfdf")
}

  const navigate = useNavigate();
  // debugger;
  return (
    <div>
      <table border="2px" border-collapse="collapse">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Резюме</th>
          <th>Карточка завода</th>
          <th>Контракт</th>
          <th>Подписанный контракт</th>
        </tr>
      </thead>
      <tbody>
        {documents.map(document => {
          const student = students.find(student => student.id === document.idStudent);
          return (
            <tr key={document.id}>
              <td>{student ? student.first_name : '-'} {student ? student.second_name : '-'}</td>
              <td><a href=  {document.resume_path}         target="_blank">Резюме</a></td>
              <td><a href= {document.factory_card_path}    target="_blank" >Карточка завода</a></td>
              <td>
              <a href={document.contract_path}         target="_blank">Контракт</a>
              <button onClick={ () => downloadcontract(student.id) }>Скачать</button>
              </td>
              <td><a href={document.signed_contract_path}  target="_blank">Подписанный контракт</a></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  )
  
}

