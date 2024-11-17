'use client'
import type { FormEvent } from 'react'
import type { TLogInData } from '@type/auth'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { FormBtn } from '@common/button/button'
import { Input } from '@common/input/input'

import Auth from '@service/auth/auth'

import { logInInputs } from './constants'
import { addCookies } from '@helper/cookies'

const LogIn = () => {
    const auth = new Auth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData) as TLogInData

        const [user, err] = await auth.logIn(body)

        setLoading(false)

        if (err) {
            alert(err)
        } else {
            addCookies(user)
            router.push('/')
        }
    }

    return (
        <main id="log-in-page">
            <div className="form_overlay">
                <h1>Log In</h1>

                <form onSubmit={onSubmit}>
                    {logInInputs.map(input => {
                        return (
                            <Input
                                name={input.name}
                                type={input.type}
                                label={input.label}
                                required={input.required}
                                key={input.name}
                            />
                        )
                    })}

                    <FormBtn loading={loading} title="Log in" />
                </form>
            </div>
        </main>
    )
}

export default LogIn
