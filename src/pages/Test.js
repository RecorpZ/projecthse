import React from 'react'
import axios from "axios"
import { useEffect ,useState } from 'react'



export const Test = ( ) => {
    const [name, setName] = useState('');
    const [require, setrequire] = useState([]);
    const [materlist, setMaterlist] = useState([]);
    useEffect(() => {
      axios.post("https://hat-servers-insafyus.amvera.io/materiallist")
        .then((res) => {
          const a = res.data;
          a.forEach((entry) => {
            setMaterlist(prevMaterlist => {
              return [...prevMaterlist, entry.CursName];
            });
          });
        })
        .catch(error => console.error('Error:', error));
    }, []);


    const OnFinish = e => {
        e.preventDefault();
    const cursname = e.target.Cursname.value;
    const curscost = e.target.cost.value;
    const cursdur = e.target.duration.value;
    const curstime = e.target.time.value;

    axios.post("https://hat-servers-insafyus.amvera.io/crmat",{cursname, curscost,cursdur,curstime})
    .then(res =>{
      if(res.data === "already"){
        console.log("Имя занято")
        alert("Предмет с таким названием уже существует")
      }
      if(res.data === "sled")
      {
        require.forEach((reqe) => {
          axios.post("https://hat-servers-insafyus.amvera.io/crreq",{cursname,reqe})
        });
        window.location.reload();
      }
    })
    
    
  }

    return (
      <div class = "mem">
        <form class="form-req" onSubmit= {OnFinish}>
          <h3>Создание нового предмета</h3>
          <div className="mb-3">
            <label>Название предмета</label>
            <input
              minLength={1}
              required
              name = "Cursname"
              className="form-control"
              placeholder="Напишите название предмета"
            />
          </div>

          <div className="mb-3">
            <label>Стоимость в кредитах</label>
            <input
              minLength={1}
              required
              name = "cost"
              type="number"
              className="form-control"
              placeholder="Напишите стоимость"
            />
            <datalist></datalist>
          </div>

          <div className="mb-3">
            <label>Продолжительность курса по модулям</label>
            <input
              minLength={1}
              required
              name = "duration"
              max = "4"
              min = '1'
              type="number"
              className="form-control"
              placeholder="Напишите сколько модулей идет курс"
            />
          </div>

          <div className="mb-3">
            <label>Длительность предмета в учебных часах</label>
            <input
              min = "1"
              required
              name = "time"
              type="number"
              className="form-control"
              placeholder="Напишите длительность"
            />
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" >
              Добавить
            </button>
          </div>
        </form>
        
        <form class="form-req" >
        <h3>Редактирование зависимостей</h3>
        <select  defaultValue="none" onChange={e => setName(e.target.value)} >
        <option value="none" disabled hidden/> 
        {materlist.map((option, index) => (
            <option  value={option}>{option}</option> 
         ))}
        </select>

        <button onClick={(e) => {
        e.preventDefault()
        const hasname = require.some(item => item === name);
        if (name.length > 0 && !hasname){
          
          setrequire([
            ...require,
            name
          ]);
        }
        }}>Add</button>
        <ul>
        {require.map(req => (
          <li key={req.name}>{req}
          <button onClick={(e) => {
                e.preventDefault()
                let result = require.filter(a => a !== req)
                setrequire(result)

            }}>
              Удалить
            </button>
          </li>
        ))}
        </ul>
        </form>
      </div>

      
      
    )
 
}

