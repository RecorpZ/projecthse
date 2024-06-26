import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CreatePlans = ( ) => {

    const [materlist, setMaterlist] = useState([]);
    const [plansm, setPlansm] = useState([]);
    const [plannamelist, setPlanName] = useState([]);
    const [reqlist, setReqlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [valByIndex, setValByIndex] = useState({});
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
          setLoading(false);
        }
    
        fetchData();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }

      const ValByIndex = (value, id) => {
        setValByIndex(prevState => ({
          ...prevState,
          [id]: value
        }));
      };
      
      const getValByIndex = (id) => {
        return valByIndex[id];
      };

      const getOptions = (par) => {
        const options = [];
        for (let i = 1; i <= 5 - par.CoursDuration; i++) {
          options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
      };

      function moddelete(par){
       
        const dependenciesMet = reqlist.filter(item => item.ReqId  === par.Id)
        let r1 = module1.filter(item => item.CursName !== par.CursName)
        let r2 = module2.filter(item => item.CursName !== par.CursName)
        let r3 = module3.filter(item => item.CursName !== par.CursName)
        let r4 = module4.filter(item => item.CursName !== par.CursName)
         if (dependenciesMet.length > 0){
          let depId = dependenciesMet[0].CursId
           r1 = r1.filter(item => item.Id !== depId)
           r2 = r2.filter(item => item.Id !== depId)
           r3 = r3.filter(item => item.Id !== depId)
           r4 = r4.filter(item => item.Id !== depId)
        }
        setM1(r1)
        setM2(r2)
        setM3(r3)
        setM4(r4)

      }

      function sumOfCreditCost(mas) {
        const sum = mas.reduce((total, current) => {
          if (current.hasOwnProperty('CreditCost')) {
            return total + current.CreditCost;
          } else {
            return total;
          }
        }, 0);
        return sum
      }


        function sumOfTeachHours(mas) {
          const sum = mas.reduce((total, current) => {
            if (current.hasOwnProperty('TeachHours')) {
              return total + current.TeachHours;
            } else {
              return total;
            }
          }, 0);
          return sum
        }

        function sumOfTeachHours(mas) {
          const sum = mas.reduce((total, current) => {
            if (current.hasOwnProperty('TeachHours')) {
              return total + current.TeachHours;
            } else {
              return total;
            }
          }, 0);
          return sum
        }
        function tooabove(){
          let mmas1 = sumOfCreditCost(module1)
          let mmas2 = sumOfCreditCost(module2)
          let mmas3 = sumOfCreditCost(module3)
          let mmas4 = sumOfCreditCost(module4)
          let sum = mmas1+ mmas2 + mmas3 +mmas4
          if (module1.length > 0 && module2.length > 0 && module3.length > 0 && module4.length > 0){
            if (mmas1 > 0.4*sum){
              return 1
            }
            if (mmas2 > 0.4*sum){
              return 2
            }
            if (mmas3 > 0.4*sum){
              return 3
            }
            if (mmas4 > 0.4*sum){
              return 4
            }
          }
        }

        function sumOfMasCredit(par) {
          const totalMem = [module1, module2, module3, module4];
          let sum = 0;
          totalMem.forEach(array => {
            array.forEach(obj => {
              sum += obj.CreditCost;
            });
          });
          if (sum + par.CreditCost > 60){
            console.log(sum)
            alert("Внимание, количество кредитов превышает 60 единиц.")
          }
        }

        function funOfMasCredit() {
          const totalMem = [module1, module2, module3, module4];
          let sum = 0;
          totalMem.forEach(array => {
            array.forEach(obj => {
              sum += obj.CreditCost;
            });
          });
            return sum
          
        }

        function funOfMasHours() {
          const totalMem = [module1, module2, module3, module4];
          let sum = 0;
          totalMem.forEach(array => {
            array.forEach(obj => {
              sum += obj.TeachHours;
            });
          });
            return sum
          
        }

      function getModuleToUpdate(val) {
        switch (val) {
          case "1":
            return module1;
          case "2":
            return module2;
          case "3":
            return module3;
          case "4":
            return module4;
          default:
            return [];
        }
      }
      function isDependencyMet(dependencyId, moduleList) {
        // Проверяем, существует ли предмет с заданным id в предыдущих модулях
        for (const module of moduleList) {
          for (const item of module) {
            if (item.Id === dependencyId) {
              return true; // Нашли предмет с таким id
            }
          }
        }
        return false; // Предмет не найден
      }


      function addMat(val,par) {
        const moduleToUpdate = getModuleToUpdate(val)
        if (moduleToUpdate.length < 5) {
                            const mas1 = []
                            var depId = null
                            var isMet = true
                            const dependenciesMet = reqlist.filter(item => item.CursId  === par.Id)
                            if (dependenciesMet.length > 0){
                              depId = dependenciesMet[0].ReqId
                            }
                            const hasCursName = mas1.concat(module1, module2, module3,module4).some((item) => item.CursName === par.CursName);
                            if (hasCursName){
                            }
                            else{
                              switch (val) {
                                
                                case "1":
                                  if (depId === null){
                                  switch (par.CoursDuration) {
                                    case 1:
                                      setM1([...module1,par]);
                                      break;
                                    case 2:
                                      setM1([...module1,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      setM2([...module2,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      break;
                                    case 3:
                                      setM1([...module1,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                      setM2([...module2,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                      setM3([...module3,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                      break;
                                    case 4:
                                      setM1([...module1,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/4,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/4}]);
                                      setM2([...module2,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/4,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/4}]);
                                      setM3([...module3,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/4,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/4}]);
                                      setM4([...module4,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/4,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/4}]);
                                      break;
                                  }
                                  }
                                  break;
                                case "2":
                                  if (dependenciesMet.length > 0){
                                    isMet = isDependencyMet(depId, [module1]);
                                  }
                                  if (isMet) {
                                  switch (par.CoursDuration) {
                                    case 1:
                                      setM2([...module2,par]);
                                      break;
                                    case 2:
                                      setM2([...module2,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      setM3([...module3,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      break;
                                    case 3:
                                      setM2([...module2,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                      setM3([...module3,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                      setM4([...module4,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/3,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/3}]);
                                       break;
                                  }
                                  }
                                  break;
                                case "3":
                                  if (dependenciesMet.length > 0){
                                    isMet = isDependencyMet(depId, [module1, module2]);
                                  }
                                  if (isMet) {
                                  switch (par.CoursDuration) {
                                    case 1:
                                      setM3([...module3,par]);
                                      break;
                                    case 2:
                                      setM3([...module3,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      setM4([...module4,{Id:par.Id,CursName:par.CursName,CreditCost:par.CreditCost/2,CoursDuration:par.CoursDuration,TeachHours:par.TeachHours/2}]);
                                      break;
                                  }
                                  }
                                  break;
                                case "4":
                                  if (dependenciesMet.length > 0){
                                    isMet = isDependencyMet(depId, [module1, module2, module3]);
                                  }
                                  if (isMet) {
                                  switch (par.CoursDuration) {
                                    case 1:
                                      setM4([...module4,par]);
                                      break;
                                  }
                                  }
                                  break;     
                            }
                          }
                        }
                        else {
                          alert("Вы не можете добавить больше 5 элементов в 1 модуль");
                        }
      }

      function getRequirementsByCursId(id) {
        const filteredReqIds = reqlist.filter((item) => item.CursId === id).map((item) => item.ReqId);
        const fin = materlist.filter((item) => filteredReqIds.includes(item.Id));
        
        return fin.map((item) => item.CursName);
      }

      const OnFinish = e => {
              e.preventDefault();
        const tplanname= e.target.planname.value;
        console.log(tplanname)
        const existed = plannamelist.some(obj => obj.PlanName === tplanname);
        if (!existed && (module1.length > 0 || module2.length > 0 || module3.length > 0 || module4.length > 0)){
          const modifiedMas1 = module1.map((item, index) => ({ ...item, Module: 1 }));
          const modifiedMas2 = module2.map((item, index) => ({ ...item, Module: 2 }));
          const modifiedMas3 = module3.map((item, index) => ({ ...item, Module: 3 }));
          const modifiedMas4 = module4.map((item, index) => ({ ...item, Module: 4 }));

          // Объединяем массивы modifiedMas1, modifiedMas2, modifiedMas3 и modifiedMas4
          const combined = modifiedMas1.concat(modifiedMas2, modifiedMas3, modifiedMas4);
          axios.post("https://hat-servers-insafyus.amvera.io/addplans",{combined,tplanname})
          setTimeout(() => {
            window.location.reload();
            }, 500);
        }

      }
      //  {plans:Plansname, 1module:{"cursname":{creditcost:"cost",CoursDuration:"dur",teachHour:"fsf"},"cursname":{creditcost:"cost",CoursDuration:"dur",teachHour:"fsf"}},2module:{},3module:{},4module{}}

    //    {id"key", planname{""}}  {id"key""}
    //
    return (
      <div>
        
        <form onSubmit= {OnFinish} >
        <div className='contained'>
        <div className='contain'>
        <div className='half-page'>
            <label>Название плана</label>
            <input
              minLength={3}
              required
              name = "planname"
              type="text"
              className="form-control"
              placeholder="Напишите название учебного плана"
            />
            <button type="submit" className='half-page'>Сохранить</button>
          </div>
        
        
        <div className='half-page'>
          {(funOfMasCredit() > 0) &&(
            <p> <span className='bold'>Всего зачетных единиц в расписании :</span> {funOfMasCredit()}</p>
          )}
          {(funOfMasHours() > 0) &&(
            <p> <span className='bold'>Всего учебных часов в расписании :</span> {funOfMasHours()}</p>
          )}
          {(funOfMasCredit() > 60) &&(
            <p style={{ color: "red" }}>Количество кредитов превышает 60 единиц отведенных на год</p>
          )}
          {(tooabove() === 1) &&(
            <p> <span style={{ color: "red" }} className='bold'>В первом модуле слишком много учебных часов</span></p>
          )
          }
          {(tooabove() === 2) &&(
            <p> <span style={{ color: "red" }} className='bold'>Во втором модуле слишком много учебных часов</span></p>
          )
          }
          {(tooabove() === 3) &&(
            <p> <span style={{ color: "red" }} className='bold'>В третьем модуле слишком много учебных часов</span></p>
          )
          }
          {(tooabove() === 4) &&(
            <p> <span style={{ color: "red" }} className='bold'>В четвертом модуле слишком много учебных часов</span></p>
          )
          }
          
          </div>
        </div>
          


            
          <ul className='cornd'>
        {materlist.map(par => (
          <div className='smallblock'>
             <li ><span className='bold'>Название:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>  

        <select  defaultValue="none" onChange={e => ValByIndex(e.target.value, par.Id)} >
            <option value="none" disabled hidden/> 
            {getOptions(par)}
        </select>
            
        <button onClick={(e) => {
            e.preventDefault()
            addMat(getValByIndex(par.Id),par)

            
        }}>Добавить</button>       
          </div>
        ))}
        </ul>
        </div>

        <div className='okno'>
        <ul className='module'>
        <label>1 модуль</label>
        <div><p> <span className='bold'>Кредитов: </span>{sumOfCreditCost(module1)} <span className='bold'>Уч.часов: </span>{sumOfTeachHours(module1)}</p></div>
        {module1.map(par => (
          <div className='block'>
             <li ><span className='bold'>Название:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>      

             <button onClick={(e) => {
                e.preventDefault()
                moddelete(par)

            }}>
              Удалить
            </button>

          </div>
          
        ))}
        </ul>

        <ul className='module'>
        <label>2 модуль</label>
        <p><span className='bold'>Кредитов: </span>{sumOfCreditCost(module2)} <span className='bold'>Уч.часов: </span>{sumOfTeachHours(module2)}</p>
        {module2.map(par => (
          <div className='block'>
             <li ><span className='bold'>Название:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>  

             <button onClick={(e) => {
                e.preventDefault()
                moddelete(par)

            }}>
              Удалить
            </button>

          </div>
        ))}
        </ul>

        <ul className='module'>
        <label>3 модуль</label>
        <p><span className='bold'>Кредитов: </span>{sumOfCreditCost(module3)} <span className='bold'>Уч.часов: </span>{sumOfTeachHours(module3)}</p>
        {module3.map(par => (
          <div className='block'>
             <li ><span className='bold'>Название:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>

             <button onClick={(e) => {
                e.preventDefault()
                moddelete(par)


            }}>
              Удалить
            </button>

          </div>
        ))}
        </ul>

        <ul className='module'>
        <label>4 модуль</label>
        <p><span className='bold'>Кредитов: </span>{sumOfCreditCost(module4)} <span className='bold'>Уч.часов: </span>{sumOfTeachHours(module4)}</p>
        {module4.map(par => (
          <div className='block'>
             <li ><span className='bold'>Название:</span> {par.CursName} | <span className='bold'>Стоимость в кредитах:</span> {par.CreditCost} </li>
             <li ><span className='bold'>Длительность:</span> {par.CoursDuration} {par.CoursDuration === 1 ? ' модуль' : ' модуля'} | <span className='bold'>Длительность:</span> {par.TeachHours} часов</li>  
             <li ><span className='bold'>Зависимость:</span> {(getRequirementsByCursId(par.Id)).join(', ')}</li>    

             <button onClick={(e) => {
                e.preventDefault()
                moddelete(par)

            }}>
              Удалить
            </button>

          </div>
        ))}
        </ul>
        </div>
                                          
        </form>
      </div>
    )
 
}
 