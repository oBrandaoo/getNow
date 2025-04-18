import { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_CashFlow.svg';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function Reports() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: '',
        status: ''
    });

    // NavItems consistentes
    const navItems = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Produtos', path: '/products' },
        { name: 'Serviços', path: '/services' },
        { name: 'Relatórios', path: '/reports', active: true },
        { name: 'Configurações', path: '/settings' }
    ];

    // Busca transações do backend
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            // Construir query params
            const params = new URLSearchParams();
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.type) params.append('type', filters.type);
            if (filters.status) params.append('status', filters.status);

            const response = await fetch(`http://localhost:8080/api/transactions?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Erro ao carregar transações');

            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            type: '',
            status: ''
        });
        fetchTransactions();
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return '#2ecc71';
            case 'PENDING': return '#f39c12';
            case 'FAILED': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const monthlyProfit = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ].map((monthName, index) => {
        const transactionsFiltered = [];
        const month = index + 1;
        let total = transactionsFiltered
            .filter((t) => t.type === 'Lucro' && new Date(t.date).getMonth() + 1 === month)
            .reduce((sum, t) => sum + t.amount, 0);

        if (month === 4) {
            total = 45.9;
        }
        return { month: monthName, total };
    });

    return (
        <div style={styles.container}>
            {/* Navbar */}
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
                <button style={styles.logoutButton} onClick={() => navigate('/login')}>Sair</button>
            </div>

            {/* Conteúdo Principal */}
            <main style={styles.mainContent}>
                {/* Filtros */}
                <section style={styles.filterSection}>
                    <h2 style={styles.sectionTitle}>Filtrar Transações</h2>

                    <div style={styles.filterGrid}>
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Data Inicial:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                style={styles.filterInput}
                            />
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Data Final:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                style={styles.filterInput}
                            />
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Tipo:</label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                style={styles.filterInput}
                            >
                                <option value="">Todos</option>
                                <option value="SERVICE_PAYMENT">Pagamento de Serviço</option>
                                <option value="PRODUCT_PURCHASE">Compra de Produto</option>
                                <option value="REFUND">Reembolso</option>
                            </select>
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Status:</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                style={styles.filterInput}
                            >
                                <option value="">Todos</option>
                                <option value="PENDING">Pendente</option>
                                <option value="COMPLETED">Completo</option>
                                <option value="FAILED">Falhou</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.filterActions}>
                        <button
                            style={styles.applyButton}
                            onClick={fetchTransactions}
                        >
                            Aplicar Filtros
                        </button>
                        <button
                            style={styles.resetButton}
                            onClick={handleResetFilters}
                        >
                            Limpar Filtros
                        </button>
                    </div>
                </section>

                {/* Tabela de Transações */}
                <div style={styles.tableContainer}>
                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <p style={styles.loadingText}>Carregando transações...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyText}>Nenhuma transação encontrada</p>
                        </div>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <th style={styles.tableHeader}>ID</th>
                                    <th style={styles.tableHeader}>Data</th>
                                    <th style={styles.tableHeader}>Descrição</th>
                                    <th style={styles.tableHeader}>Valor Bruto</th>
                                    <th style={styles.tableHeader}>Valor da venda</th>
                                    <th style={styles.tableHeader}>Tipo</th>
                                    <th style={styles.tableHeader}>Método</th>
                                    <th style={styles.tableHeader}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{transaction.id}</td>
                                        <td style={styles.tableCell}>{formatDate(transaction.createdAt)}</td>
                                        <td style={styles.tableCell}>{transaction.description}</td>
                                        <td style={styles.tableCell}>{formatCurrency(transaction.amountBrute)}</td>
                                        <td style={styles.tableCell}>{formatCurrency(transaction.amount)}</td>
                                        <td style={styles.tableCell}>
                                            {transaction.type === 'SERVICE_PAYMENT' && 'Pagamento Serviço'}
                                            {transaction.type === 'PRODUCT_PURCHASE' && 'Compra Produto'}
                                            {transaction.type === 'REFUND' && 'Reembolso'}
                                        </td>
                                        <td style={styles.tableCell}>
                                            {transaction.method === 'CARD' && 'Cartão'}
                                            {transaction.method === 'PIX' && 'PIX'}
                                            {transaction.method === 'CASH' && 'Dinheiro'}
                                        </td>
                                        <td style={{
                                            ...styles.tableCell,
                                            color: getStatusColor(transaction.status)
                                        }}>
                                            {transaction.status === 'COMPLETED' && 'Completo'}
                                            {transaction.status === 'PENDING' && 'Pendente'}
                                            {transaction.status === 'FAILED' && 'Falhou'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div style={styles.chartContainer}>
                        <h2 style={styles.sectionTitle}>Lucro Mensal</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={monthlyProfit}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" stroke="#f0f0f0" />
                                <YAxis stroke="#f0f0f0" />
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                                <Bar dataKey="total" fill="#28a745" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Estilos
const styles = {
    chartContainer: {
        marginTop: '40px',
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(5px)',
    },
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
        padding: '30px 40px',
    },
    filterSection: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '20px',
        backdropFilter: 'blur(5px)',
    },
    sectionTitle: {
        fontSize: '20px',
        margin: '0 0 20px 0',
        color: '#ffffff',
    },
    filterGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '20px',
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    filterLabel: {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    filterInput: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#fff',
        fontSize: '14px',
    },
    filterActions: {
        display: 'flex',
        gap: '15px',
    },
    applyButton: {
        padding: '10px 20px',
        borderRadius: '6px',
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
    resetButton: {
        padding: '10px 20px',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        color: '#f0f0f0',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    tableContainer: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(5px)',
        overflowX: 'auto',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontStyle: 'italic',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        backgroundColor: 'rgba(58, 123, 213, 0.3)',
    },
    tableHeader: {
        padding: '15px',
        textAlign: 'left',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    tableRow: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
    },
    tableCell: {
        padding: '15px',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: '',
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

export default Reports;