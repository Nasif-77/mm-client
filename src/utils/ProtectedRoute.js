import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();


    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        let isMounted = true
        const checkUserToken = () => {
            const userToken = localStorage.getItem('token');

            if (!userToken || userToken === 'undefined') {
                setIsLoggedIn(false);
                return navigate('/login')
            }
            setIsLoggedIn(true);
        }
        if (isMounted) checkUserToken();
        return () => {
            isMounted = false
        }
    }, [navigate]);

    return isLoggedIn && children
}

export default ProtectedRoute;