import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext("");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  // Replace return with our server

  // function signup(username, password) {
  //  return AuthContext.createUserWithEmailAndPassword(username, password)
  // }

  // function login(username, password) {
  //  return AuthContext.createUserWithEmailAndPassword(username, password)
  // }

  // Set current user on render

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setCurrentUser(user)
  //   })

  // return unsubscribe
  // }, [])

  const value = {
    currentUser,
    // signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
