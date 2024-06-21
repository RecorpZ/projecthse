import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentDownloadContract = ( ) => {
    const [file, setFile] = useState();
    // const [fileName, setFileName] = useState();

    // const saveFile = (e) => {
    //     setFile(e.target.files[0]);
    //     setFileName(e.target.files[0].name);
    // };

    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();
    const onFinish = e => {
      e.preventDefault();

      // получить путь к файлу
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   formData.append("fileName", fileName);
      // let path = ""
      // axios.get("http://localhost:3001/documents/factorycardpath/"+idStudent)
      // .then(res => {path = res.data})
      // .catch(err => {console.log(err); return;});
      
      // location.href = path + file;
      
      // установить шаг
      let step = 4;
      axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
      .then(navigate('/student/'))
      .catch(err => console.log(err));
    }

    return (
      <form class='form-login' onSubmit={onFinish}>
        <div className="mb-3">
          <label className="mb-3">Скачайте договор. Распечатайте и отдайте на подписание своему работодателю.</label>
            <div className="d-flex justify-content-end">
                {/* <input type="file" name="file"/> */}
                <button type="submit" className="btn btn-success">Скачать</button>
            </div>
        </div>
      </form>
    )
}