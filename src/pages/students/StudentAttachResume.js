import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentAttachResume = ( ) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const idStudent = localStorage.getItem('UserId');

    const navigate = useNavigate();

    useEffect(() => {
      // проверка шага
      axios.get("http://localhost:3001/students/getStep/"+idStudent)
      .then(res => {
          let step = res.data.step;
          if (step != 6) navigate('/student/');
        });
      });

    const onFinish = e => {
      e.preventDefault();
      
      // установить путь к файлу
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      axios.put("http://localhost:3001/documents/resumepath/"+idStudent, formData)
      .then(res => {
        if (res.data == "NoFile"){
          alert("Файл не прикреплен");
        }
        else{
          // установить шаг
          let step = 7;
          axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
          .then(navigate('/student/'))
          .catch(err => console.log(err));
        }
      })
      .catch(err => {console.log(err); return;});
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
      <form class='form-login' onSubmit={onFinish}>
        <div className="mb-3">
          <label className="mb-3">Прикрепите резюме.</label>
            <div className="d-flex justify-content-end">
                <input type="file" name="file" onChange={saveFile}/>
                <button type="submit" className="btn btn-success">Отправить</button>
            </div>
        </div>
      </form>
    )
}