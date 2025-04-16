import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_CashFlow.svg';

function Products() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const [products, setProducts] = useState([
        { id: 1, name: 'Smartphone Premium', category: 'Eletrônicos', price: 2999.90, stock: 15 },
        { id: 2, name: 'Notebook Pro', category: 'Eletrônicos', price: 5499.00, stock: 8 },
        { id: 3, name: 'Mesa de Escritório', category: 'Móveis', price: 899.90, stock: 22 },
        { id: 4, name: 'Cadeira Ergonômica', category: 'Móveis', price: 1299.00, stock: 10 },
        { id: 5, name: 'Fone Bluetooth', category: 'Acessórios', price: 349.90, stock: 35 },
        { id: 6, name: 'Mouse Sem Fio', category: 'Acessórios', price: 149.90, stock: 42 },
    ]);

    const navItems = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Produtos', path: '/products', active: true },
        { name: 'Serviços', path: '/services' },
        { name: 'Relatórios', path: '/reports' },
        { name: 'Configurações', path: '/settings' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSaveProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const savedProduct = await response.json();
                setProducts(prev => [...prev, savedProduct]);
                setShowModal(false);
                setNewProduct({ name: '', description: '', price: '', stock: '' });
                navigate("/products");
            } else {
                alert('Erro ao salvar o produto');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao conectar com o servidor');
        }
    };

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
                <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
            </div>
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={{ marginBottom: '10px' }}>Adicionar Produto</h2>
                        <input type="text" placeholder="Nome" style={styles.modalInput} value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                        <input type="text" placeholder="Descrição" style={styles.modalInput} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                        <input type="number" placeholder="Preço" style={styles.modalInput} value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
                        <input type="number" placeholder="Estoque" style={styles.modalInput} value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} />
                        <div style={styles.modalButtonRow}>
                            <button
                                style={{ ...styles.modalButton, ...styles.modalSaveButton }}
                                onClick={handleSaveProduct}
                            >
                                Salvar
                            </button>
                            <button
                                style={{ ...styles.modalButton, ...styles.modalCancelButton }}
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Conteúdo Principal */}
            <main style={styles.mainContent}>
                {/* Barra de Ações */}
                <div style={styles.actionBar}>
                    <div style={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            style={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button style={styles.searchButton}>🔍</button>
                    </div>
                    <button style={styles.addButton} onClick={() => setShowModal(true)}>
                        + Adicionar Produto
                    </button>
                </div>

                {/* Tabela de Produtos */}
                <div style={styles.tableContainer}>
                    <table style={styles.productTable}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Nome</th>
                                <th style={styles.tableHeader}>Descrição</th>
                                <th style={styles.tableHeader}>Preço</th>
                                <th style={styles.tableHeader}>Estoque</th>
                                <th style={styles.tableHeader}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{product.id}</td>
                                    <td style={styles.tableCell}>{product.name}</td>
                                    <td style={styles.tableCell}>{product.description}</td>
                                    <td style={styles.tableCell}>
                                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td style={{
                                        ...styles.tableCell,
                                        color: product.stock < 10 ? '#ff6b6b' : '#a5d8ff'
                                    }}>
                                        {product.stock}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button style={styles.actionButton}>Editar</button>
                                        <button style={{ ...styles.actionButton, ...styles.deleteButton }}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div style={styles.pagination}>
                    <button style={styles.pageButton}>Anterior</button>
                    <span style={styles.pageInfo}>Página 1 de 1</span>
                    <button style={styles.pageButton}>Próxima</button>
                </div>
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
        padding: '30px 40px',
        position: 'relative',
    },
    actionBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        padding: '10px 15px',
        borderRadius: '8px 0 0 8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        color: '#fff',
        fontSize: '14px',
        width: '300px',
        outline: 'none',
    },
    searchButton: {
        padding: '10px 15px',
        borderRadius: '0 8px 8px 0',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderLeft: 'none',
        backgroundColor: '#3a7bd5',
        color: 'white',
        cursor: 'pointer',
    },
    addButton: {
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: '#00c9a7',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#00a58e',
        },
    },
    tableContainer: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '20px',
    },
    productTable: {
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
    },
    actionButton: {
        padding: '5px 10px',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(58, 123, 213, 0.5)',
        },
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        ':hover': {
            backgroundColor: 'rgba(255, 107, 107, 0.5)',
        },
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    },
    pageButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        backgroundColor: 'rgba(58, 123, 213, 0.3)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(58, 123, 213, 0.5)',
        },
    },
    pageInfo: {
        color: 'rgba(255, 255, 255, 0.7)',
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
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalContent: {
        backgroundColor: '#2c2c2c',
        padding: '30px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        color: '#fff',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    
    // Adicione isso no mesmo objeto de styles:
    modalInput: {
        padding: '12px 15px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
        transition: 'border 0.3s ease',
    },
    modalInputFocus: {
        border: '1px solid #3a7bd5',
    },
    modalButtonRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '10px',
    },
    modalButton: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
    modalSaveButton: {
        backgroundColor: '#00c9a7',
        color: '#fff',
    },
    modalCancelButton: {
        backgroundColor: '#555',
        color: '#fff',
    },
    
};

export default Products;