import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const PStudentAttachCard = ( ) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();
    const onFinish = e => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      axios.put("http://localhost:3001/documents/factorycardpath/"+idStudent, formData)
      .then(navigate('/'));  //TODO
    }

    return (
      <form class='form-login' onSubmit={onFinish}>
        <h3>Регистрация аккаунта</h3>
        <div className="mb-3">
          <label>Загрузите файл.</label>
            <div className="d-flex justify-content-end">
                <input type="file" name="file" onChange={saveFile}/>
                <button type="submit" className="btn btn-success">Отправить</button>
            </div>
        </div>
      </form>
    )
}