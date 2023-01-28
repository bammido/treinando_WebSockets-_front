import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import './App.css'

import Chat from './Components/Chat/Chat'
import Login from "./Components/Login/Login";
import { useState } from "react";
import { Button } from "primereact/button";

export type LoggedUserType =  {user: string, userId: string} 

function App() {
  const [loggedUser, setLoggedUser] = useState<LoggedUserType | {}>({})

  return (
    <div className="App">
      <div className="app__logout">
        <Button onClick={() => setLoggedUser({})} className='app__logout__button' label="loggout" aria-label="loggout" />
      </div>
      <div className="app__body">
        {!(loggedUser as LoggedUserType).user && <Login setLoggedUser={setLoggedUser} />}
        {(loggedUser as LoggedUserType).user && <Chat loggedUser={loggedUser} />}
      </div>
    </div>
  )
}

export default App
