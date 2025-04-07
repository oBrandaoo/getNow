import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_CashFlow.svg';

function AudioTransaction() {
    const navigate = useNavigate();
    const [dadosTransacao, setDadosTransacao] = useState(null);
    const [mensagem, setMensagem] = useState("");
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
        { name: 'Serviços', path: '/services', active: true },
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
        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockResponse = {
                amount: 245.90,
                amountBrute: 200.00,
                type: "PURCHASE",
                description: "Mesa para construção",
                method: "CARD"
            };

            setDadosTransacao(mockResponse);

            setTranscription([
                `Transação: ${mockResponse.description}`,
                `Valor: R$ ${mockResponse.amount.toFixed(2)}`,
                `Valor Bruto: R$ ${mockResponse.amountBrute.toFixed(2)}`,
                `Método: ${mockResponse.method === 'CARD' ? 'Cartão de crédito' : mockResponse.method}`
            ].join("\n"));

        } catch (error) {
            console.error("Erro na simulação:", error);
            alert("Erro na simulação (verifique o console)");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSave = async () => {
        if (!dadosTransacao) {
            alert("Nenhuma transação para salvar.");
            return;
        }

        try {
            const saved = await saveTransaction(dadosTransacao, 1);
            setMensagem("Transação salva com sucesso!");
            navigate("/reports");
        } catch (error) {
            setMensagem("Erro ao salvar transação.");
        }
    };

    const saveTransaction = async (transaction, userId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/transactions?userId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(transaction),
                }
            );

            if (!response.ok) {
                const msg = await response.text();
                console.error("Erro ao salvar transação:", msg);
                throw new Error("Erro ao salvar transação");
            }

            return await response.json();
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw error;
        }
    }

    const mockApiCall = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockData = [
                    "Transação: Mesa para construção",
                    "Valor: R$ 245,90",
                    "Valor Bruto: R$ 300,00",
                    "Categoria: Despesas Operacionais",
                    "Fornecedor: Papelaria Central"
                ].join("\n");
                resolve(mockData);
            }, 2000);
        });
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
                    <div style={styles.logoContainer}>
                        <img src={logo} alt="Logo" style={styles.logoImage} />
                        <h1 style={styles.logoText}></h1>
                    </div>
                    <div style={styles.navLinks}>
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                style={{
                                    ...styles.navButton,
                                    ...(item.active && styles.activeNavButton)
                                }}
                                onClick={() => navigate(item.path)}
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
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Salvando...' : 'Salvar Transação'}
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
        padding: '20px 40px',
        backgroundColor: 'rgba(15, 15, 15, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '50px',
    },
    navLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    navButton: {
        background: 'transparent',
        border: 'none',
        color: '#f0f0f0',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    activeNavButton: {
        backgroundColor: 'rgba(58, 123, 213, 0.5)',
    },
    logoutButton: {
        padding: '10px 16px',
        fontSize: '14px',
        borderRadius: '8px',
        backgroundColor: '#3a7bd5',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
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
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logoImage: {
        width: '150px',
        height: '150px',
        objectFit: 'contain',
        borderRadius: '50%',
        filter: 'brightness(0) invert(1)',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
        margin: 0,
    },
};

export default AudioTransaction;