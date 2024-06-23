import React, { useState, useEffect } from 'react'
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
    
    useEffect(() => {
      // проверка шага
      axios.get("http://localhost:3001/students/getStep/"+idStudent)
      .then(res => {
          let step = res.data.step;
          if (step != 3) navigate('/student/');
        });
      });

    const onFinish = e => {
      e.preventDefault();
      e.stopPropagation();

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
        
        // установить шаг
        let step = 4;
        axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
        .then(res => navigate('/student/'))
        .catch(err => console.log(err));
      })
      // .then(res => {
      //     let step = res.data.step;
      //     if (step != 3) navigate('/student/');
      //     let response = res.data;
      //     console.log(response);
      //     const blob = response.blob();
      //     const downloadURL = window.URL.createObjectURL(blob);
      //     const link = document.createElement('a');
      //     link.href = downloadURL;
      //     document.body.appendChild(link);
      //     link.click();
      //     link.remove();
      //   })
      .catch(err => console.log(err));

  // async function getPhoto(e) {
  //   await axios.get("http://localhost:3001/downloads", {responseType: 'blob'})
  //   .then(res => {
  //     const blob = res.data
  //     const downloadURL = window.URL.createObjectURL(new Blob([blob]));
  //         const link = document.createElement('a');
  //         link.href = downloadURL;
  //         link.download = 'file.jpg'
  //         document.body.appendChild(link);
  //         link.click();
  //         link.remove();
  //   })
  //   .catch(err => console.log(err))
  // }

      // console.log(response)
      // const blob = response.blob();
      // const downloadURL = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = downloadURL;
      // // link.download = 
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      
      // установить шаг
      // let step = 4;
      // axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
      // .then(navigate('/student/'))
      // .catch(err => console.log(err));
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