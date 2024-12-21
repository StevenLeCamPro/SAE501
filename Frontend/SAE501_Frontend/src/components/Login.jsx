import Cookies from 'js-cookie'
import { useState } from 'react';
import GetCookieInfo from './ReadCookie';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = JSON.stringify({ email, password });

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: loginData,
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('auth_data', JSON.stringify({
                    user_id: data.user_id,
                    role: data.role,
                    date: data.date,
                    token: data.token,
                }), { secure: true, sameSite: 'strict' });

                console.log('Login successful!');
                GetCookieInfo()
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default Login