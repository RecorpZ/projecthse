import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Studmaterials = () => {
  const [materlist, setMaterlist] = useState([]);
  const [reqlist, setReqlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [del,setDel] = useState("0");
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const responseMat = await axios.get('http://localhost:3001/matlist');
      setMaterlist(responseMat.data);
      const responseReq = await axios.get('http://localhost:3001/reqlist');
      setReqlist(responseReq.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  function getRequirementsByCursId(id) {
    const filteredReqIds = reqlist.filter((item) => item.CursId === id).map((item) => item.ReqId);
    const fin = materlist.filter((item) => filteredReqIds.includes(item.Id));
    
    return fin.map((item) => item.CursName);
  }
  function redactmat(par){
    sessionStorage.setItem('myKey', par.Id);
    
    setTimeout(() => {
      navigate('/redmat',{ replace: true });
      window.location.reload();
      }, 500);

  }

  const handleDelete = (cursName) => {
    const updatedMat = materlist.filter((item) => item.CursName !== cursName);
    const updatedReq = materlist.filter((item) => item.CursName !== cursName);
    setMaterlist(updatedMat);
    setReqlist(updatedReq);
  };
  async function deleteData(cursname) {
    await axios.delete('http://localhost:3001/delete',{cursname});
  }

  return (
    <div className="mem">
      <ul >
        {materlist.map(par => (
          <div className="form-block">
             <li ><span className='bold'>Название предмета:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность курса:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность курса:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость от других курсов:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>    
             <button className = "half-page" onClick={(e) => {
                if (del === 1 + par.Id){
                  handleDelete(par.CursName)
                  var cursName = par.Id
                  axios.post('http://localhost:3001/delete',{cursName});
                  setDel(0)
                }
                else{
                  setDel(1+par.Id)
                }
            }}>
              {del === 1+par.Id ?(
                 <h7>Подтвердить</h7>
              ):(
                <h7>Удалить</h7>
              )}
            </button>  
            <button className = "half-page" onClick={(e) => {
                redactmat(par)
            }}>
              Редактировать
            </button>                
          </div>
        ))}
        </ul>
        <h5 className="form-block">
            <a href="/cremat">Добавить новый предмет</a>         
          </h5>
              
    </div>
  );
};
