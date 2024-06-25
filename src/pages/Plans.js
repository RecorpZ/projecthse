import React, { useState, useEffect } from 'react';
import axios from 'axios';



export const Plans = ( ) => {

const [materlist, setMaterlist] = useState([]);
const [reqlist, setReqlist] = useState([]);
const [plansm, setPlansm] = useState([]);
const [plannamelist, setPlanName] = useState([]);
const [loading, setLoading] = useState(true);
const [open, setOpen] = useState(false);
const [openid,setOpenId] = useState(0);
const [module1, setM1] = useState([]);
const [module2, setM2] = useState([]);
const [module3, setM3] = useState([]);
const [module4, setM4] = useState([]);


useEffect(() => {
  async function fetchData() {
    const responseMat = await axios.get('https://hat-servers-insafyus.amvera.io/matlist');
    setMaterlist(responseMat.data);
    const responseReq = await axios.get('https://hat-servers-insafyus.amvera.io/reqlist');
    setReqlist(responseReq.data);
    const planname = await axios.get('https://hat-servers-insafyus.amvera.io/plannamelist');
    setPlanName(planname.data);
    const planlist = await axios.get('https://hat-servers-insafyus.amvera.io/planelist');
    setPlansm(planlist.data);
    setLoading(false);
  }

  fetchData();
}, []);


if (loading) {
  return <div>Loading...</div>;
}

function sumOfTeachHours(parId) {
  let sum = 0;
  for (const row of plansm) {
    if (row.PlanId === parId) {
      sum += row.Hours;
    }
  }
  return sum;
}

function sumOfCreditCost(parId) {
  let sum = 0;
  for (const row of plansm) {
    if (row.PlanId === parId) {
      sum += row.Cost;
    }
  }
  return sum;
}

function sumCredit(arr) {
  let sum = 0;
  for (const row of arr) {
      sum += row.Hours;
  }
  return sum;
}

function sumHours(arr) {
  let sum = 0;
  for (const row of arr) {
      sum += row.Cost;
  }
  return sum;
}

function sumOfCreditCost(parId) {
  let sum = 0;
  for (const row of plansm) {
    if (row.PlanId === parId) {
      sum += row.Cost;
    }
  }
  return sum;
}

function tablefragment(parId){
  const tablizabezpomeh = plansm.filter((item) => item.PlanId === parId)
  const module1Data = tablizabezpomeh.filter(item => item.Module === 1);
  const module2Data = tablizabezpomeh.filter(item => item.Module === 2);
  const module3Data = tablizabezpomeh.filter(item => item.Module === 3);
  const module4Data = tablizabezpomeh.filter(item => item.Module === 4);

  setM1(module1Data)
  setM2(module2Data)
  setM3(module3Data)
  setM4(module4Data)
}
function sumOfmaterial(parId) {
  let sum = 0;
  for (const row of plansm) {
    if (row.PlanId === parId) {
      sum += 1;
    }
  }
  return sum;
}


function searchplanname(parId){
  let otv = "";
  for (const row of plannamelist) {
    if (row.Id === parId) {
      otv = row.PlanName;
    }
  }
  return otv;
}

function searchmatname(parId) {
  let otv = "";
  for (const row of materlist) {
    if (row.Id === parId) {
      otv = row.CursName;
    }
  }
  return otv;
}

function getRequirementsByCursId(id) {
  const filteredReqIds = reqlist.filter((item) => item.CursId === id).map((item) => item.ReqId);
  const fin = materlist.filter((item) => filteredReqIds.includes(item.Id));
  
  return fin.map((item) => item.CursName);
}

    return (
      <div className='contained'>

        <div className='left-half'>

        <ul className='corn'>
        {plannamelist.map(par => (
          <div className='smallblock'>
             <li><span className='bold'>Название:</span> {par.PlanName}</li>
             <li> <span className='bold'> Всего кредитов:</span> {sumOfCreditCost(par.Id)}    |    <span className='bold'> Всего учебных часов:</span> {sumOfTeachHours(par.Id)} </li>
              <li> <span className='bold'> Учебных предметов:</span> {sumOfmaterial(par.Id)}  </li>
        <button onClick={(e) => {
            e.preventDefault()
            setOpen(true)
            setOpenId(par.Id)
            tablefragment(par.Id)
        }}>Просмотреть</button>
            <button onClick={(e) => {
            e.preventDefault()
            setOpen(true)
            setOpenId(par.Id)
            tablefragment(par.Id)
        }}>Редактировать</button>
        <button onClick={(e) => {
            e.preventDefault()
            setOpen(true)
            setOpenId(par.Id)
            tablefragment(par.Id)
        }}>Удалить</button>   
          </div>
        ))}
        </ul>

        </div>
        
        <div className='right-half'>
        {open && (
          <div className='okno'>
          <ul className='module'>
          <label>1 модуль</label>
          <p><span className='bold'>Кредитов: </span>{sumCredit(module1)} <span className='bold'>Уч.часов: </span>{sumHours(module1)}</p>
          {module1.map(par => (
            <div className='block'>
               <li ><span className='bold'>Название:</span> {searchmatname(par.MatId)} | <span className='bold'>Стоимость в кредитах:</span> {par.Cost} </li>
               <li ><span className='bold'>Длительность:</span> {par.Hours} часов</li>  
               <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.MatId)).join(', ')}</li>
            </div>
          ))}
          </ul>

          <ul className='module'>
          <label>2 модуль</label>
          <p><span className='bold'>Кредитов: </span>{sumCredit(module2)} <span className='bold'>Уч.часов: </span>{sumHours(module2)}</p>
          {module2.map(par => (
            <div className='block'>
               <li ><span className='bold'>Название:</span> {searchmatname(par.MatId)} | <span className='bold'>Стоимость в кредитах:</span> {par.Cost} </li>
               <li ><span className='bold'>Длительность:</span> {par.Hours} часов</li>  
               <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.MatId)).join(', ')}</li>
            </div>
          ))}
          </ul>

          <ul className='module'>
          <label>3 модуль</label>
          <p><span className='bold'>Кредитов: </span>{sumCredit(module3)} <span className='bold'>Уч.часов: </span>{sumHours(module3)}</p>
          {module3.map(par => (
            <div className='block'>
               <li ><span className='bold'>Название:</span> {searchmatname(par.MatId)} | <span className='bold'>Стоимость в кредитах:</span> {par.Cost} </li>
               <li ><span className='bold'>Длительность:</span> {par.Hours} часов</li>  
               <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.MatId)).join(', ')}</li>
            </div>
          ))}
          </ul>

          <ul className='module'>
          <label>4 модуль</label>
          <p><span className='bold'>Кредитов: </span>{sumCredit(module4)} <span className='bold'>Уч.часов: </span>{sumHours(module4)}</p>
          {module4.map(par => (
            <div className='block'>
               <li ><span className='bold'>Название:</span> {searchmatname(par.MatId)} | <span className='bold'>Стоимость в кредитах:</span> {par.Cost} </li>
               <li ><span className='bold'>Длительность:</span> {par.Hours} часов</li>  
               <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.MatId)).join(', ')}</li>
            </div>
          ))}
          </ul>

         
         </div>
        
        )}
        </div>
          

      </div>
    )
 
}
 