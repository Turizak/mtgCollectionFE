import { createContext, useState} from "react";

const AuthContext = createContext<any>({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    })

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext