import {Container, Nav, Navbar} from 'react-bootstrap'
import logo from "./HSE_LOGO.png"
import exit from "./box-arrow-right.svg"
import {Routes,BrowserRouter as Router, Route} from "react-router-dom"

import {Home} from '../pages/Home'
import {Redactmaterials} from "../pages/RedMater"
import {Studmaterials} from '../pages/Studmaterials'
import {Plans} from '../pages/Plans'
import {Misc} from '../pages/Misc'
import {Regist} from '../pages/Regist'
import {Test} from '../pages/Test'
import {Login} from '../pages/Login'
import { PrivateAcc } from './privateacc'
import { Logout } from '../pages/Logout'
import {PrivateRoute} from './privateroute'
import {Creatematerials} from "../pages/CreateMater"
import { CreatePlans } from '../pages/CreatPlans'

export const Header = ( ) => {
  
const username = localStorage.getItem('UserName');
const usernickname = localStorage.getItem('UserNickname');
const token = localStorage.getItem('Token');
    return (
      <>
      <Navbar fixed='top' collapseOnSelect expand="md"  variant='dark'>  
        <Container >
            <Navbar.Brand href='/'>
                <img
                    src={logo}
                    height={30}
                    width={30}
                    className='d-inline-block align-top'
                    alt='Logo'
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id ='responsive-navbar-nav'>

                <Nav className="ml-auto">
                    <Nav.Link href="/">Основная страница</Nav.Link>
                    {token === "Pass" ? 
                    (
                      <>
                        <Nav.Link href="/creplan">Создать план</Nav.Link>
                        <Nav.Link href="/plans">Планы</Nav.Link>
                        <Nav.Link href="/studmaterials">Учебные дисциплины</Nav.Link>
                        <Nav.Link href="/cremat">Создать предмет</Nav.Link>
                        <Nav.Link href="/misc">Прочее</Nav.Link>
                      </>
                    ) 
                  : (
                      <>
                        <Nav.Link href="/login">Авторизация</Nav.Link>
                        <Nav.Link href="/reg">Регистрация</Nav.Link>
                      </>
                    )
                    }
                    
                </Nav>       
                

            </Navbar.Collapse>
            
        </Container>
        {
        username !== "" && username !== null && username !== undefined && 
        (
          <Navbar.Brand>{`Добро пожаловать ${usernickname} ${username}`}</Navbar.Brand>
        )
        }
        {token ==="Pass" && (
                      <Nav.Link href="/logout" className="ml-auto text-light  d-flex align-items-center " style={{ fontSize: '20px' }} ><img src={exit}height={40} width={40} alt="Выход" className="mr-2"/>Выход</Nav.Link>
                    )}
        
      </Navbar>

        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="/cremat" element={<Creatematerials/>} />
                <Route path="/redmat" element={<Redactmaterials/>} />
                <Route path="/creplan" element={<CreatePlans/>} />
                <Route path="/test" element={<Test/>} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/studmaterials" element={<Studmaterials />} />
                <Route path="/misc" element={<Misc/>} />
                <Route path="/logout" element={<Logout/>} />
              </Route>
              <Route element={<PrivateAcc/>}>
              <Route path="/reg" element={<Regist/>} />
              <Route path="/login" element={<Login/>} />
              </Route>
          </Routes>
        </Router>
      </>
    )
}

