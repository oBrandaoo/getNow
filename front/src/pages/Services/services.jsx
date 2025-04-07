import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

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

    const resetForm = () => {
        setAudioUrl('');
        setTranscription('');
        audioChunksRef.current = [];
    };

    return (
        <div className="container">
            {/* Conteúdo Principal Focado */}
            <main className="main-content">
                <section className="section">
                    <h2 className="section-title">Registrar Nova Transação por Áudio</h2>

                    <div className="audio-section">
                        {/* Controles de Gravação */}
                        <div className="recording-container">
                            <button
                                className={isRecording ? 'stop-button' : 'record-button'}
                                onClick={isRecording ? stopRecording : startRecording}
                                disabled={isProcessing || isSaving}
                            >
                                {isRecording ? (
                                    <>
                                        <span className="recording-indicator">●</span> Gravando...
                                    </>
                                ) : (
                                    'Iniciar Gravação'
                                )}
                            </button>

                            {audioUrl && (
                                <div className="audio-preview">
                                    <audio controls src={audioUrl} className="audio-element" />
                                </div>
                            )}
                        </div>

                        {/* Botão de Processamento */}
                        <button
                            className="process-button"
                            onClick={processAudio}
                            disabled={!audioUrl || isRecording || isProcessing || isSaving}
                        >
                            {isProcessing ? 'Analisando...' : 'Processar com IA'}
                        </button>
                    </div>

                    {/* Transcrição Gerada */}
                    {transcription && (
                        <div className="transcription-section">
                            <h3 className="subtitle">Transação Detectada</h3>
                            <div className="transcription-box">
                                {transcription.split('\n').map((line, i) => (
                                    <p key={i} className="transcription-line">{line}</p>
                                ))}
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="cancel-button"
                                    onClick={resetForm}
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="save-button"
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

export default AudioTransaction;