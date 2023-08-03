import React, { useEffect, useState } from 'react'
import Registration from '../components/Registration'
import axios from 'axios';
import style from '../styles/login.module.scss'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import jwtDecode from 'jwt-decode';
function Loginpage() {

  const navigate = useNavigate()
  const [response, setResponse] = useState('')


  useEffect(() => {
    const isAuth = () => {
      let token = localStorage.getItem('token')
      if (token) {
        token = jwtDecode(token)
        if (token.role === 'students') navigate('/assignments')
        else navigate('/students')
      }
      else return
    }
    isAuth()
  }, [navigate])

  const handleSubmit = useCallback(async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/login`, values);
      if (response.status === 200) {
        setResponse('')
        localStorage.setItem('token', response.data.data)
        navigate('/')
      }
    } catch (error) {
      if (error?.response.status === 500) setResponse('You have entered an invalid email or password')
    }
  }, [navigate]);

  return (
    <div className={style.loginPage}>
      <Registration login submitLogin={handleSubmit} response={response} />
    </div>
  )
}

export default Loginpage