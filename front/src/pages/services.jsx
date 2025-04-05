import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AudioTransaction() {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [transcription, setTranscription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const navItems = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Produtos', path: '/products' },
        { name: 'Serviços', path: '/services' },
        { name: 'Relatórios', path: '/reports' },
        { name: 'Configurações', path: '/settings' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavClick = (path) => {
        navigate(path);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current);
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Microfone não acessível. Verifique as permissões.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const processAudio = async () => {
        if (!audioUrl) return;
        
        setIsProcessing(true);
        
        // Simulação de chamada à API de IA
        try {
            // Substitua por chamada real à sua API
            const mockResponse = await mockApiCall();
            setTranscription(mockResponse);
        } catch (error) {
            alert('Erro ao processar áudio');
        } finally {
            setIsProcessing(false);
        }
    };

    const mockApiCall = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockData = [
                    "Transação: Compra de materiais de escritório",
                    "Valor: R$ 245,90",
                    "Categoria: Despesas Operacionais",
                    "Fornecedor: Papelaria Central"
                ].join("\n");
                resolve(mockData);
            }, 2000);
        });
    };

    const saveTransaction = async () => {
        if (!transcription) return;
        
        setIsSaving(true);
        
        try {
            // Substitua por chamada real ao seu backend
            await mockSaveToDatabase(transcription);
            alert('Transação salva com sucesso!');
            resetForm();
        } catch (error) {
            alert('Erro ao salvar transação');
        } finally {
            setIsSaving(false);
        }
    };

    const mockSaveToDatabase = (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Transação salva no banco de dados:', data);
                resolve();
            }, 1000);
        });
    };

    const resetForm = () => {
        setAudioUrl('');
        setTranscription('');
        audioChunksRef.current = [];
    };

    return (
        <div style={styles.container}>
            {/* Navbar Simplificada */}
            <div style={styles.navbar}>
                <div style={styles.navLeft}>
                    <h1 style={styles.logo}>Registro por Áudio</h1>
                    <div style={styles.navLinks}>
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                style={styles.navButton}
                                onClick={() => handleNavClick(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
            </div>

            {/* Conteúdo Principal Focado */}
            <main style={styles.mainContent}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Registrar Nova Transação por Áudio</h2>
                    
                    <div style={styles.audioSection}>
                        {/* Controles de Gravação */}
                        <div style={styles.recordingContainer}>
                            <button 
                                style={isRecording ? styles.stopButton : styles.recordButton}
                                onClick={isRecording ? stopRecording : startRecording}
                                disabled={isProcessing || isSaving}
                            >
                                {isRecording ? (
                                    <>
                                        <span style={styles.recordingIndicator}>●</span> Gravando...
                                    </>
                                ) : (
                                    'Iniciar Gravação'
                                )}
                            </button>
                            
                            {audioUrl && (
                                <div style={styles.audioPreview}>
                                    <audio controls src={audioUrl} style={styles.audioElement} />
                                </div>
                            )}
                        </div>
                        
                        {/* Botão de Processamento */}
                        <button 
                            style={styles.processButton} 
                            onClick={processAudio}
                            disabled={!audioUrl || isRecording || isProcessing || isSaving}
                        >
                            {isProcessing ? 'Analisando...' : 'Processar com IA'}
                        </button>
                    </div>
                    
                    {/* Transcrição Gerada */}
                    {transcription && (
                        <div style={styles.transcriptionSection}>
                            <h3 style={styles.subtitle}>Transação Detectada</h3>
                            <div style={styles.transcriptionBox}>
                                {transcription.split('\n').map((line, i) => (
                                    <p key={i} style={styles.transcriptionLine}>{line}</p>
                                ))}
                            </div>
                            
                            <div style={styles.actionButtons}>
                                <button 
                                    style={styles.cancelButton}
                                    onClick={resetForm}
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    style={styles.saveButton}
                                    onClick={saveTransaction}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Salvando...' : 'Confirmar Transação'}
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        fontFamily: 'Arial, sans-serif',
        color: '#f0f0f0',
        overflowX: 'hidden',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: 'rgba(15, 15, 15, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    navLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff',
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    navButton: {
        background: 'transparent',
        border: 'none',
        color: '#f0f0f0',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    logoutButton: {
        padding: '8px 16px',
        borderRadius: '6px',
        backgroundColor: '#3a7bd5',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#2c5fb3',
        },
    },
    mainContent: {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    section: {
        backgroundColor: 'rgba(30, 30, 30, 0.7)',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
    sectionTitle: {
        fontSize: '20px',
        margin: '0 0 25px 0',
        color: '#fff',
        textAlign: 'center',
    },
    audioSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    recordingContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
    },
    recordButton: {
        padding: '12px 24px',
        borderRadius: '50px',
        backgroundColor: '#00c9a7',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#00a58e',
        },
        ':disabled': {
            opacity: 0.7,
            cursor: 'not-allowed',
        },
    },
    stopButton: {
        padding: '12px 24px',
        borderRadius: '50px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#ff5252',
        },
    },
    recordingIndicator: {
        color: '#ff6b6b',
        fontSize: '20px',
        animation: 'pulse 1.5s infinite',
    },
    audioPreview: {
        width: '100%',
        marginTop: '10px',
    },
    audioElement: {
        width: '100%',
        borderRadius: '8px',
    },
    processButton: {
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#7950f2',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#6741d9',
        },
        ':disabled': {
            backgroundColor: '#555',
            cursor: 'not-allowed',
        },
    },
    transcriptionSection: {
        marginTop: '30px',
        animation: 'fadeIn 0.5s ease',
    },
    subtitle: {
        fontSize: '18px',
        margin: '0 0 15px 0',
        color: '#fff',
    },
    transcriptionBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        borderLeft: '4px solid #3a7bd5',
    },
    transcriptionLine: {
        margin: '8px 0',
        lineHeight: '1.5',
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
    },
    cancelButton: {
        padding: '10px 20px',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        color: '#f0f0f0',
        border: '1px solid #555',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    saveButton: {
        padding: '10px 20px',
        borderRadius: '6px',
        backgroundColor: '#51cf66',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#40c057',
        },
        ':disabled': {
            backgroundColor: '#555',
            cursor: 'not-allowed',
        },
    },
};

export default AudioTransaction;