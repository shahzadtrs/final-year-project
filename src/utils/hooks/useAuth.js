import { useSelector } from 'react-redux'

function useAuth() {
    const user = useSelector((state) => state.auth.user)
    console.log(user)
    return {
        authenticated: Object.keys(user).length > 0 && user?.email,
    }
}

export default useAuth
