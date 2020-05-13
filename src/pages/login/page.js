import React, { useState, useContext, useEffect } from 'react'
import { SiteContext, Field, Button } from 'ywana-core6'
import { AppContext } from '../../AppContext'

/**
 * Login Page
 */
const Page = ({ user = "", pwd = "" }) => {

    const site = useContext(SiteContext)
    const context = useContext(AppContext)
    const logged = context.logged
    const [email, setEmail] = useState(user)
    const [password, setPassword] = useState(pwd)

    useEffect(() => { login() }, [])
    useEffect(() => { if (logged) site.goto("INBOX") }, [logged])

    const login = () => {
        context.login(email, password)
    }
 
    return (
        <div>
            <Field label="E-mail" value={email} onChange={(id, value) => setEmail(value)} />
            <Field label="Password" value={password} onChange={(id, value) => setPassword(value)} />
            <Button label="SIGN IN" action={login} />
        </div>
    )
}

export default Page