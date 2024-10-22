// import { useState, MouseEvent } from 'react';
// import { register } from '../services/auth.service';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/auth.context';

// export default function SignUp() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//     const { login } = useAuth()
//     const navigate = useNavigate()

//     const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         const user = await register({ name, email, password })
//         login(user.email, user.name)
//         navigate("/profile")
//     };

//     return (
//         <>
//             <h1>Create an account</h1>
//             <form>
//                 <p>
//                     <label htmlFor="name">Name: </label>
//                     <input
//                         type="text"
//                         placeholder="Enter your name here"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </p>
//                 <p>
//                     <label htmlFor="email">Email: </label>
//                     <input
//                         type="email"
//                         placeholder="Enter your email here"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </p>
//                 <p>
//                     <label htmlFor="password">Password: </label>
//                     <input
//                         type="password"
//                         placeholder="Enter your password here"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </p>
//                 <button type="button" onClick={handleSignUp}>Submit</button>
//             </form>
//         </>
//     );
// }


import { useState, MouseEvent, CSSProperties } from 'react';
import { register } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        color: '#333',
        padding: '20px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '300px', // Adjust width as necessary
    },
    button: {
        backgroundColor: '#0072b8', // Nextcloud blue
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#005f8a', // Darker blue on hover
    },
};

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = await register({ name, email, password });
        login(user.email, user.name);
        navigate("/profile");
    };

    return (
        <div style={styles.container}>
            <h1>Create an account</h1>
            <form>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        placeholder="Enter your name here"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                    />
                </p>
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
                    onClick={handleSignUp}
                    style={styles.button}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor || '')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor || '')}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
