// import { useState, useEffect } from "react";
// import Login from "./login";
// import SignUp from "./signup";
// import { useAuth } from "../context/auth.context";
// import { useNavigate } from "react-router-dom";

// export default function Auth() {
//     const [hasAccount, setHasAccount] = useState(false);
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             navigate("/profile");
//         }
//     }, [user, navigate]);

//     const toggleAccountType = () => {
//         setHasAccount((prev) => !prev);
//     };

//     return (
//         <div>
//             {hasAccount ? <Login /> : <SignUp />}
//             <button onClick={toggleAccountType}>
//                 {hasAccount ? "Switch to Sign Up" : "Switch to Login"}
//             </button>
//         </div>
//     );
// }

import { useState, useEffect, CSSProperties } from "react";
import Login from "./login";
import SignUp from "./signup";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [hasAccount, setHasAccount] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const toggleAccountType = () => {
        setHasAccount((prev) => !prev);
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
        button: {
            backgroundColor: '#0072b8', // Nextcloud blue
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            marginTop: '20px',
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
            {hasAccount ? <Login /> : <SignUp />}
            <button
                style={styles.button}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleAccountType}
            >
                {hasAccount ? "Switch to Sign Up" : "Switch to Login"}
            </button>
        </div>
    );
}
