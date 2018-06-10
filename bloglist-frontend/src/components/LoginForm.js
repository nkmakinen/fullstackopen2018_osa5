import React from 'react'

const LoginForm = ({ username, password, handleLoginFieldChange, login }) => (
    <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={login}>
            <div>
                <label>käyttäjätunnus</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleLoginFieldChange}
                />
            </div>
            <div>
                <label>salasana</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleLoginFieldChange}
                />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    </div>
)

export default LoginForm