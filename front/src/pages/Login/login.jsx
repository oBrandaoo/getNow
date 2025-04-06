import { useState } from 'react';
import { useEffect } from 'react';
import { createRoutesFromElements, useNavigate } from 'react-router-dom';

function Login() {
    const [mensagem, setMensagem] = useState('');
    const [mensagemTipo, setMensagemTipo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === 'teste@gmail.com' && senha === '123456') {
            setMensagem('Login realizado com sucesso!');
            setMensagemTipo('sucesso');
            setTimeout(() => {
                navigate('/home');
            }, 500);
        } else {
            setMensagem('Email ou senha inválidos.');
            setMensagemTipo('erro');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2 style={styles.title}>Login</h2>
                {mensagem && (
                    <div style={mensagemTipo === 'sucesso' ? styles.sucesso : styles.erro}>
                        {mensagem}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Entrar</button>
            </form>
        </div>
    );
}

const styles = {
    title: {
        fontFamily:'Arial',
        color: '#fff',
        fontWeight: '600',
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '20px',
        textShadow: '0 0 3px #ffffff80',
    },
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        padding: '0 20px',
        boxSizing: 'border-box',
    },
    form: {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '40px 30px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        color: 'white',
    },
    input: {
        cursor: 'text',
        padding: '12px 15px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        color: 'white',
        transition: 'all 0.3s ease',
    },
    
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#7ED6A5',
        color: 'black',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s',
    },
    sucesso: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
      erro: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};

export default Login;