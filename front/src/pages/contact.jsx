import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, email, mensagem });
    setEnviado(true);
    setTimeout(() => {
      navigate('/agradecimento');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.container}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Entre em Contato</h2>

        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Sua mensagem"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>Enviar</button>

        {enviado && <p style={styles.sucesso}>Mensagem enviada com sucesso!</p>}
      </form>
    </motion.div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    width: '100vw',
    overflow: 'hidden',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '30px 20px',
    borderRadius: '16px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 0 3px #ffffff80',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    color: '#fff',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: 'white',
    fontSize: '16px',
    resize: 'vertical',
    height: '100px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  button: {
    padding: '12px',
    border: 'none',
    backgroundColor: '#7ED6A5',
    color: 'black',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s ease-in-out',
    fontFamily: "'Poppins', sans-serif",
  },
  sucesso: {
    textAlign: 'center',
    color: '#d4edda',
    fontWeight: 'bold',
    fontFamily: "'Poppins', sans-serif",
  },
};

export default Contact;

