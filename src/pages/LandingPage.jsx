import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
    useEffect(() => {
        const isAuth = () => {
            let token = localStorage.getItem('token')
            if (token) {
                token = jwtDecode(token)
                if (token.role === 'students') navigate('/assignments')
                else if (token.permissions?.length > 0) navigate(`/${token.permissions[0]}`)
                else if (token.permissions) navigate(`/profile`)
                else navigate('/mentors')

            } else {
                navigate('/login')
            }
        }
        isAuth()
    }, [navigate])

    return (
        <div>

        </div>
    )
}

export default LandingPage