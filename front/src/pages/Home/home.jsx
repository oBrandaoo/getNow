import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({
        saldo: 12500.75,
        produtosEstoque: 342,
        valorFaturado: 58420.90,
        lucro: 18750.30,
        clientesAtivos: 124,
        pedidosPendentes: 17
    });

    const recentActivities = [
        { id: 1, action: 'Pedido #4587 concluído', time: '10 min atrás', value: 'R$ 1.250,00' },
        { id: 2, action: 'Novo cliente cadastrado', time: '25 min atrás' },
        { id: 3, action: 'Produto esgotado: Smartphone X', time: '1 hora atrás' },
        { id: 4, action: 'Pagamento recebido - Pedido #4582', time: '2 horas atrás', value: 'R$ 890,00' },
    ];

    return (
        <div className="container">
            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Seção de Métricas */}
                <section className="metrics-section">
                    <h2 className="section-title">Visão Geral</h2>
                    <div className="metrics-grid">
                        {/* Cartão de Saldo */}
                        <div className="metric-card">
                            <div className="metric-icon money-icon">💰</div>
                            <div className="metric-info">
                                <h3 className="metric-label">Saldo Disponível</h3>
                                <p className="metric-value">
                                    {metrics.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>

                        {/* Cartão de Estoque */}
                        <div className="metric-card">
                            <div className="metric-icon inventory-icon">📦</div>
                            <div className="metric-info">
                                <h3 className="metric-label">Produtos em Estoque</h3>
                                <p className="metric-value">{metrics.produtosEstoque}</p>
                            </div>
                        </div>

                        {/* Cartão de Faturamento */}
                        <div className="metric-card">
                            <div className="metric-icon revenue-icon">💵</div>
                            <div className="metric-info">
                                <h3 className="metric-label">Faturamento Mensal</h3>
                                <p className="metric-value">
                                    {metrics.valorFaturado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>

                        {/* Cartão de Lucro */}
                        <div className="metric-card">
                            <div className="metric-icon profit-icon">📈</div>
                            <div className="metric-info">
                                <h3 className="metric-label">Lucro Mensal</h3>
                                <p className="metric-value">
                                    {metrics.lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção de Atividades Recentes e Gráficos */}
                <section className="dashboard-grid">
                    {/* Atividades Recentes */}
                    <div className="activity-card">
                        <h3 className="card-title">Atividades Recentes</h3>
                        <ul className="activity-list">
                            {recentActivities.map(activity => (
                                <li key={activity.id} className="activity-item">
                                    <div className="activity-content">
                                        <p className="activity-action">{activity.action}</p>
                                        <p className="activity-time">{activity.time}</p>
                                    </div>
                                    {activity.value && <span className="activity-value">{activity.value}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Gráfico de Vendas */}
                    <div className="chart-card">
                        <h3 className="card-title">Vendas Mensais</h3>
                        <div className="chart-placeholder">
                            <p className="chart-text">Gráfico de vendas será exibido aqui</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;