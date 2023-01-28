import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import './Login.css'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import generateId from '../../helpers/functions/generateId';
import { LoggedUserType } from '../../App';

export default function Login({setLoggedUser}: {setLoggedUser: Dispatch<SetStateAction<LoggedUserType>>}){
    const [user, setUser] = useState<string>('')

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        const loggedUser: LoggedUserType = {
            user,
            userId: generateId()
        }

        setLoggedUser(loggedUser)
    }

    return <div className='login'>
        <form className='login__form' onSubmit={handleSubmit}>
            <label htmlFor='userLogin'><h4>Insira um nome de usuário:</h4></label>
            <InputText autoFocus={true} value={user} onChange={e => setUser(e.target.value)} id='userLogin' className='form__login__input' />
            <Button className='form__login__button' label="Entrar" aria-label="Entrar" />
        </form>
    </div>
}