import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentNavigation = () => {
    const idStudent = localStorage.getItem('UserId');
    const role = localStorage.getItem('Role');

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/students/getStep/"+idStudent)
        .then(res => {
            let step = res.data.step;
            console.log(step);
            switch(step) {
                case 0:
                    navigate('/student/hascompany');
                    break;
                case 1:
                    navigate("/student/attachcard");
                    break;
                case 2:
                    navigate('/student/waitresponse');
                      break;
                case 3:
                    navigate('/student/downloadcontract');
                    break;
                case 4:
                    navigate('/student/attachsignedcontract');
                    break;
                case 5:
                    navigate('/student/waitapprove');
                    break;
                case 6:
                    navigate('/student/attachresume');
                    break;
                case 7:
                    navigate('/student/choosecompanies');
                    break;
                case 8:
                    navigate('/student/applicationstatus');
                    break;
                case 9:
                    navigate('/student/accepted');
                    break;
                default:
                    navigate('/student/hasCompany');
            }
        })
        .catch(err => console.log(err));
    }, []);

    return (<div></div>)
}