import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentAttachSignedContract = ( ) => {
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
      
      // установить путь к файлу
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      axios.put("http://localhost:3001/documents/signedcontract/"+idStudent, formData)
      .catch(err => {console.log(err); return;});
      
      // установить шаг
      let step = 9;
      axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
      .then(navigate('/student/'))
      .catch(err => console.log(err));
    }

    return (
      <form class='form-login' onSubmit={onFinish}>
        <div className="mb-3">
          <label className="mb-3">Прикрепите подписанный работодателем договор.</label>
            <div className="d-flex justify-content-end">
                <input type="file" name="file" onChange={saveFile}/>
                <button type="submit" className="btn btn-success">Отправить</button>
            </div>
        </div>
      </form>
    )
}