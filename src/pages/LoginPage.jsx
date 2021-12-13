import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(email, password)
        const payload = { email, password }
        const url = "https://lab.willandskill.eu/api/v1/auth/api-token-auth/"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token
                localStorage.setItem("webb21-lesson5", token)
                navigate("/posts")
            })
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
