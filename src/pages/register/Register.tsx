import Heading from "../../components/Heading/Heading.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import styles from '../login/Login.module.css'
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {register, userActions} from "../../store/user.slice.ts";

export type RegisterForm = {
    email: {
        value: string
    }
    password: {
        value: string
    }
    name: {
        value: string
    }
}
export function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {jwt, registerErrorMessage } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate]);
    const submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearRegisterError())
        const target = e.target as typeof e.target & RegisterForm
        const {email, password, name} =  target
        dispatch(register({email: email.value, password: password.value, name: name.value}))
    }


    return (
        <div className={styles['login']}>
            <Heading>Регистрация</Heading>
            {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
            <form className={styles['form']} onSubmit={submit}>
                <div className={styles['field']}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id='email' name='email' placeholder="Email"/>
                </div>
                <div className={styles['field']}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id='password' name='password' type='password' placeholder='Пароль'/>
                </div>
                <div className={styles['field']}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input id='name' name='name' placeholder='Имя'/>
                </div>
                <Button appearance="big">Зарегистрироваться</Button>
            </form>
            <div className={styles['links']}>
                <div>Есть аккаунт?</div>
                <Link to="/auth/login">Войти</Link>
            </div>
        </div>
    )
}