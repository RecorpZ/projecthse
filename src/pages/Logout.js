import {React} from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = ( ) => {     

    const navigate = useNavigate()
    const OnFinish = e => 
    {
    e.preventDefault(); navigate()
    localStorage.clear();
    setTimeout(() => {
      navigate('/',{ replace: true });
      window.location.reload();
      }, 500);
    }
  return (
    
    <form class="form-login" onSubmit= {OnFinish}>
    <h3>Выход из профиля</h3>
    <h4>Вы уверена что хотите выйти из профиля ?</h4>
        <div className="d-grid">
            <button type="submit" className="btn btn-primary" >
              Выйти
            </button>
         </div>
    </form>
  )
}
