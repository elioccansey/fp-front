import { useState, MouseEvent, CSSProperties } from 'react';
import { signin } from '../services/auth.service';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await signin({ email, password });
            login(response.data.email, response.data.name);
            navigate("/profile");
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error (e.g., show a notification)
        }
    };

    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5', // Light background
            color: '#333', // Text color
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px', // Adjust based on design
        },
        input: {
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            backgroundColor: '#0072b8', // Nextcloud blue
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#005f8a', // Darker blue on hover
        },
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor || '';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = styles.button.backgroundColor || '';
    };

    return (
        <div style={styles.container}>
            <h1>Login</h1>
            <form style={styles.form}>
                <p>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        placeholder="Enter your email here"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                </p>
                <p>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        placeholder="Enter your password here"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </p>
                <button
                    type="button"
                    onClick={handleLogin}
                    style={styles.button}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
