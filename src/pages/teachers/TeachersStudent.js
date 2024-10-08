import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export const TeachersStudent = ( ) => { 
  // const [students, setStudents] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [documents, setdocuments] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  useEffect(()=>{
      console.log("new line")

            axios.get("https://hat-servers-insafyus.amvera.io/Documents/")
            .then(res => {setdocuments(res.data); console.log(res.data)})
            .catch(err => console.log(err))

       axios.get("https://hat-servers-insafyus.amvera.io/Students/")
       .then(res => {setStudents(res.data); console.log(res.data)})
       .catch(err => console.log(err))
      
      // axios.get("https://hat-servers-insafyus.amvera.io/Courses/")
      // .then(res => {setCourses(res.data); console.log(res.data)})
      // .catch(err => console.log(err))

      // axios.get("https://hat-servers-insafyus.amvera.io/StudentsCompanies/normal")
      // .then(res => {setStudentsCompanies(res.data); console.log(res.data)})
      // .catch(err => console.log(err))
  },[]);

  async function updateStudentsCompanies(_idStudent, _company, _priority, _status) {
    await axios.put(`https://hat-servers-insafyus.amvera.io/StudentsCompanies/${_idStudent}/${_company}`, {idStudent: _idStudent, idCompany: _company, priority: _priority, status: _status})
    .then(res => {console.log(res)})
    .catch(err => console.log(err))
  }
  function downloadresume(idStudent) {
        axios.get("https://hat-servers-insafyus.amvera.io/documents/downloadresume/"+idStudent, {responseType: 'blob'})
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
    axios.get("https://hat-servers-insafyus.amvera.io/documents/downloadfactorycard/"+idStudent, {responseType: 'blob'})
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
  axios.get("https://hat-servers-insafyus.amvera.io/documents/downloadcontract/"+idStudent, {responseType: 'blob'})
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
  axios.get("https://hat-servers-insafyus.amvera.io/documents/downloadsigncontract/"+idStudent, {responseType: 'blob'})
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

function uploadContract(idStudent) {
  // установить путь к файлу
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  axios.put("https://hat-servers-insafyus.amvera.io/documents/contractpath/"+idStudent, formData)
  .then(res => {
    if (res.data == "NoFile"){
      alert("Файл не прикреплен");
    };
  })
  .catch(err => {console.log(err); return;});
};

  const saveFile = (e, idStudent) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const navigate = useNavigate();
  // debugger;
  return (
    <div>
      <Table striped bordered hover border="2px" border-collapse="collapse">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Резюме</th>
          <th>Карточка предприятия</th>
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
              <td>
                {document.resume_path != null ?(
                <Button  variant="primary" onClick={ () => downloadresume(student.id) }>Скачать</Button>
              ):(
                <p>Отсутствует</p>
              )}
                </td>
              <td>
              {document.factory_card_path != null ?(
                <Button variant="primary" onClick={ () => downloadfactorycard(student.id) }>Скачать</Button>
              ):(
                <p>Отсутствует</p>
              )}
                </td>
              <td>
              {document.contract_path == null ?(
                //  <Button variant="primary" onClick={ () => downloadcontract(student.id) }>Скачать</Button>
                <form onSubmit={ () => uploadContract(student.id) }>
                    <div>
                      <input type="file" name="file" onChange={ saveFile }/>
                      <Button variant="primary" type="submit">Отправить</Button>
                    </div>
                </form>
              ):(
                <p>Прикреплён</p>
              )}
              </td>
              <td>
              {document.signed_contract_path != null ?(
                 <Button variant="primary" onClick={ () => downloadsigncontract(student.id) }>Скачать</Button>
              ):(
                <p>Отсутствует</p>
              )}
                </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </div>
  )
  
}

