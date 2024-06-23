import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StudentChooseCompanies = ( ) => {
    const [companies, setCompanies] = useState();
    const idStudent = localStorage.getItem('UserId');
    var [count_choices, setCountChoices] = useState(0);

    useEffect(() => {
      // проверка шага
      axios.get("http://localhost:3001/students/getStep/"+idStudent)
      .then(res => {
          let step = res.data.step;
          if (step != 7) navigate('/student/');
        });

      // получить список компаний
      axios.post("http://localhost:3001/companies/getCompaniesByIdStudent",{idStudent})
      .then(result => { setCompanies(result.data)})
      .catch(err => console.log(err));
      }, [idStudent]);

    const navigate = useNavigate();
    const onFinish = e => {
      e.preventDefault();
      // проверка, что выбрано 3 компании
      if (count_choices < 3){
        alert("Нужно выбрать 3 компании. Выбрано " + count_choices);
        return;
      }
      
      // добавить связи с приоритетом студентов и компаний
      for (let i = 1; i <= 3; i++){
        let company = companies.filter((item) => item.priority == i)[0]
        let idCompany = company.id
        let priority = company.priority
        axios.post("http://localhost:3001/studentscompanies", {idStudent, idCompany, priority})
        .then(res => {
          // установить шаг
          let step = 8;
          axios.put("http://localhost:3001/students/setStep/"+idStudent, {step})
          .then(res => navigate('/student/'))
          .catch(err => console.log(err));
        })
        .catch(err => {console.log(err); return;});
      }
    }
    
    const changeCompanyPriority = e => {
      let changedCompany = companies.filter((company) => company.id == e.target.value)[0]
      let isChecked = companies.filter((company) => company.id == e.target.value && (company.priority == undefined || company.priority == 0))[0] != undefined;
      console.log(isChecked);
      if (isChecked){
        setCountChoices(count_choices+1);
      }
      else{
        setCountChoices(count_choices-1);
      }
      const newCompanies = companies.map((company) => {
        if (company.id == e.target.value) {
          const updatedItem = {
            ...company,
            priority: isChecked ? count_choices+1 : 0
          };
          console.log(updatedItem, count_choices);
          return updatedItem;
        }
        else if (!isChecked){
          const updatedItem = {
            ...company,
            priority: (company.priority == undefined || company.priority == 0 || changedCompany.priority > company.priority) ? company.priority : company.priority-1
          };
          console.log(updatedItem, count_choices);
          return updatedItem;
        }
        return company;
      });
      setCompanies(newCompanies);
    }

    return (
      <form class='form-login' onSubmit={onFinish}>
        <div className="mb-3">
            <label className="mb-3">Выберите 3 компании, в которые вы бы хотели попасть на практику, с приоритетом. </label>
            {companies?.map(company => {
            return <div>
                <input type="checkbox" name="company" value={company.id} onClick={changeCompanyPriority}/>
                <label>{company.name} {company.priority == undefined || company.priority == 0 ? "" : company.priority}</label>
            </div>
            })}
        </div>
        <button type="submit" className="btn btn-success">Подтвердить</button>
      </form>
    )
}