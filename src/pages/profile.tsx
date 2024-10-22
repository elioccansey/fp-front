import { ChangeEvent, useEffect, useState, CSSProperties } from "react";
import { useAuth } from "../context/auth.context";
import api from "../services/custom-axios";

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
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: '50%',
    },
    button: {
        backgroundColor: '#0072b8', // Nextcloud blue
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#005f8a', // Darker blue on hover
    },
    fileInput: {
        marginBottom: '10px',
    },
    message: {
        marginTop: '20px',
        color: '#d9534f', // Bootstrap danger color for error messages
    },
};

export default function Profile() {
    const { user, setUser } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${user?.email}`);
                setUser(response.data);
                sessionStorage.setItem('user', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching user:', error);
                setMessage('Failed to fetch user data.');
            }
        };

        fetchUser();
    }, []); // Only runs on mount

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) setFile(files[0]);
    };

    const handleUpload = async (email: string) => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        try {
            const filename = encodeURIComponent(file.name);
            const contentType = file.type;

            // Send POST request to API Gateway
            const response = await api.put('/users', { filename, contentType, email });
            const { uploadURL } = response.data;

            // Upload the file to S3 using the pre-signed URL
            await api.put(uploadURL, file, {
                headers: { 'Content-Type': file.type },
            });

            setMessage('Upload successful!');

        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Upload failed. Please try again.');
        }
    };

    return (
        user && (
            <div style={styles.container}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                {user.profileImage ? (
                    <p>
                        <img src={user.profileImage} style={styles.profileImage} alt="Profile Image" />
                    </p>
                ) : (
                    <div>
                        <h2>Profile Image Upload</h2>
                        <p>
                            <input type="file" onChange={handleFileChange} style={styles.fileInput} />
                        </p>
                        <button
                            style={styles.button}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor || " ")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor || " ")}
                            onClick={() => handleUpload(user.email)}
                        >
                            Upload
                        </button>
                    </div>
                )}
                {message && <div style={styles.message}>{message}</div>}
            </div>
        )
    );
}
