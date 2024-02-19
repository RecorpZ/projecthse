import React, { Component } from 'react'
import { Button, Container,FormControl, Nav, Navbar, Form} from 'react-bootstrap'
import logo from "./HSE_LOGO.png"
import {Routes,BrowserRouter as Router, Route} from "react-router-dom"

import Home from '../pages/Home'
import Studmaterials from '../pages/Studmaterials'
import Plans from '../pages/Plans'
import {Misc} from '../pages/Misc'
import Regist from '../pages/Regist'
import Test from '../pages/Test'
import {Login} from '../pages/Login'


export default class header extends Component {
  render() {
    return (
      <>
      <Navbar fixed='top' collapseOnSelect expand="md"  variant='dark'>  
        <Container>
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
                <Nav className="mr-auto">
                    <Nav.Link href="/">Основная страница</Nav.Link>
                    <Nav.Link href="/plans">Планы</Nav.Link>
                    <Nav.Link href="/studmaterials">Учебные дисциплины</Nav.Link>
                    <Nav.Link href="/misc">Прочее</Nav.Link>
                </Nav>
                <Form>     
                    <FormControl 
                    type="test"
                    placeholder='Поиск'
                    className='mr-sm-2'/>              
                </Form >

                <Button variant='outline-info'>Найти</Button>
            </Navbar.Collapse>
        </Container>
      </Navbar>

        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test/>} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/studmaterials" element={<Studmaterials />} />
              <Route path="/misc" element={<Misc/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/reg" element={<Regist/>} />
          </Routes>
        </Router>
      </>
    )
  }
}
