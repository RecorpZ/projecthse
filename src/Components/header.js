import {Container, Nav, Navbar} from 'react-bootstrap'
import logo from "./HSE_LOGO.png"
import exit from "./box-arrow-right.svg"
import {Routes,BrowserRouter as Router, Route} from "react-router-dom"

import {Home} from '../pages/Home'
import {Regist} from '../pages/Regist'
import {Login} from '../pages/Login'
import { PrivateAcc } from './privateacc'
import { Logout } from '../pages/Logout'
import {PrivateRoute} from './privateroute'

import {StudentNavigation} from '../pages/students/StudentNavigation'
import {StudentAccepted} from '../pages/students/StudentAccepted'
import {StudentApplicationsStatus} from '../pages/students/StudentApplicationsStatus'
import {StudentAttachCard} from '../pages/students/StudentAttachCard'
import {StudentAttachResume} from '../pages/students/StudentAttachResume'
import {StudentAttachSignedContract} from '../pages/students/StudentAttachSignedContract'
import {StudentChooseCompanies} from '../pages/students/StudentChooseCompanies'
import {StudentDownloadContract} from '../pages/students/StudentDownloadContract'
import {StudentHasCompany} from '../pages/students/StudentHasCompany'
import {StudentWaitApprove} from '../pages/students/StudentWaitApprove'
import {StudentWaitResponse} from '../pages/students/StudentWaitResponse'

import { TeachersCompanies } from "../pages/teachers/TeachersCompanies"
import { TeachersRequests } from '../pages/teachers/TeachersRequests'

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
                    {/* <Nav.Link href="/">Основная страница</Nav.Link> */}
                    {token === "Pass" 
                    ? (
                      <>
                        {/* <Nav.Link href="/creplan">Создать план</Nav.Link>
                        <Nav.Link href="/plans">Планы</Nav.Link>
                        <Nav.Link href="/studmaterials">Учебные дисциплины</Nav.Link>
                        <Nav.Link href="/cremat">Создать предмет</Nav.Link>
                        <Nav.Link href="/misc">Прочее</Nav.Link> */}
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
                <Route path="/student/" element={<StudentNavigation/>} />
                <Route path="/student/accepted" element={<StudentAccepted/>} />
                <Route path="/student/applicationstatus" element={<StudentApplicationsStatus/>} />
                <Route path="/student/attachcard" element={<StudentAttachCard/>} />
                <Route path="/student/attachresume" element={<StudentAttachResume/>} />
                <Route path="/student/attachsignedcontract" element={<StudentAttachSignedContract/>} />
                <Route path="/student/choosecompanies" element={<StudentChooseCompanies/>} />
                <Route path="/student/downloadcontract" element={<StudentDownloadContract/>} />
                <Route path="/student/hascompany" element={<StudentHasCompany/>} />
                <Route path="/student/waitapprove" element={<StudentWaitApprove/>} />
                <Route path="/student/waitresponse" element={<StudentWaitResponse/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/teacherscomp" element={<TeachersCompanies/>} />
                <Route path="/teachersrequests" element={<TeachersRequests/>} />
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

