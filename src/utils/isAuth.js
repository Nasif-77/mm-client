export const isAuth = () => {
    const token = localStorage.getItem('token')
    if (token) return token
    else return false
}