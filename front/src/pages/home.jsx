import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navItems = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Produtos', path: '/products' },
        { name: 'Serviços', path: '/services' },
        { name: 'Relatórios', path: '/reports' },
        { name: 'Configurações', path: '/settings' },
    ];

    const recentActivities = [
        { id: 1, action: 'Pedido #4587 concluído', time: '10 min atrás', value: 'R$ 1.250,00' },
        { id: 2, action: 'Novo cliente cadastrado', time: '25 min atrás' },
        { id: 3, action: 'Produto esgotado: Smartphone X', time: '1 hora atrás' },
        { id: 4, action: 'Pagamento recebido - Pedido #4582', time: '2 horas atrás', value: 'R$ 890,00' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.navbar}>
                <div style={styles.navLeft}>
                    <h1 style={styles.logo}>(Logo) Dashboard</h1>
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
                <button style={styles.logoutButton} onClick={handleLogout}>Login</button>
            </div>

            {/* Conteúdo Principal */}
            <main style={styles.mainContent}>
                {/* Seção de Métricas */}
                <section style={styles.metricsSection}>
                    <h2 style={styles.sectionTitle}>Visão Geral</h2>
                    <div style={styles.metricsGrid}>
                        {/* Cartão de Saldo */}
                        <div style={styles.metricCard}>
                            <div style={styles.metricIcon} className="money-icon">💰</div>
                            <div style={styles.metricInfo}>
                                <h3 style={styles.metricLabel}>Saldo Disponível</h3>
                                <p style={styles.metricValue}>
                                    {metrics.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>

                        {/* Cartão de Estoque */}
                        <div style={styles.metricCard}>
                            <div style={styles.metricIcon} className="inventory-icon">📦</div>
                            <div style={styles.metricInfo}>
                                <h3 style={styles.metricLabel}>Produtos em Estoque</h3>
                                <p style={styles.metricValue}>{metrics.produtosEstoque}</p>
                            </div>
                        </div>

                        {/* Cartão de Faturamento */}
                        <div style={styles.metricCard}>
                            <div style={styles.metricIcon} className="revenue-icon">💵</div>
                            <div style={styles.metricInfo}>
                                <h3 style={styles.metricLabel}>Faturamento Mensal</h3>
                                <p style={styles.metricValue}>
                                    {metrics.valorFaturado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>

                        {/* Cartão de Lucro */}
                        <div style={styles.metricCard}>
                            <div style={styles.metricIcon} className="profit-icon">📈</div>
                            <div style={styles.metricInfo}>
                                <h3 style={styles.metricLabel}>Lucro Mensal</h3>
                                <p style={styles.metricValue}>
                                    {metrics.lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção de Atividades Recentes e Gráficos */}
                <section style={styles.dashboardGrid}>
                    {/* Atividades Recentes */}
                    <div style={styles.activityCard}>
                        <h3 style={styles.cardTitle}>Atividades Recentes</h3>
                        <ul style={styles.activityList}>
                            {recentActivities.map(activity => (
                                <li key={activity.id} style={styles.activityItem}>
                                    <div style={styles.activityContent}>
                                        <p style={styles.activityAction}>{activity.action}</p>
                                        <p style={styles.activityTime}>{activity.time}</p>
                                    </div>
                                    {activity.value && <span style={styles.activityValue}>{activity.value}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Gráfico de Vendas */}
                    <div style={styles.chartCard}>
                        <h3 style={styles.cardTitle}>Vendas Mensais</h3>
                        <div style={styles.chartPlaceholder}>
                            <p style={styles.chartText}>Gráfico de vendas será exibido aqui</p>
                        </div>
                    </div>
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
        padding: '30px 40px',
        position: 'relative',
    },
    metricsSection: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#ffffff',
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
    },
    metricCard: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        transition: 'all 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        },
    },
    metricIcon: {
        fontSize: '28px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(58, 123, 213, 0.2)',
    },
    metricInfo: {
        flex: 1,
    },
    metricLabel: {
        fontSize: '16px',
        margin: '0 0 5px 0',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    metricValue: {
        fontSize: '24px',
        margin: 0,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '20px',
    },
    activityCard: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '20px',
    },
    chartCard: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '20px',
    },
    cardTitle: {
        fontSize: '18px',
        margin: '0 0 20px 0',
        color: '#ffffff',
    },
    activityList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    activityItem: {
        padding: '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityContent: {
        flex: 1,
    },
    activityAction: {
        margin: '0 0 5px 0',
        fontSize: '14px',
    },
    activityTime: {
        margin: 0,
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
    },
    activityValue: {
        backgroundColor: 'rgba(58, 123, 213, 0.2)',
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '14px',
    },
    chartPlaceholder: {
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
    },
    chartText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
};

export default Home;