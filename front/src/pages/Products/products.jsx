import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Products() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const [products, setProducts] = useState([
        { id: 1, name: 'Smartphone Premium', category: 'Eletrônicos', price: 2999.90, stock: 15, sku: 'ELET123' },
        { id: 2, name: 'Notebook Pro', category: 'Eletrônicos', price: 5499.00, stock: 8, sku: 'ELET456' },
        { id: 3, name: 'Mesa de Escritório', category: 'Móveis', price: 899.90, stock: 22, sku: 'MOV789' },
        { id: 4, name: 'Cadeira Ergonômica', category: 'Móveis', price: 1299.00, stock: 10, sku: 'MOV012' },
        { id: 5, name: 'Fone Bluetooth', category: 'Acessórios', price: 349.90, stock: 35, sku: 'ACES345' },
        { id: 6, name: 'Mouse Sem Fio', category: 'Acessórios', price: 149.90, stock: 42, sku: 'ACES678' },
    ]);
    
    const handleAddProduct = () => {
        navigate('/products/new');
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Barra de Ações */}
                <div className="action-bar">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button">🔍</button>
                    </div>
                    <button className="add-button" onClick={handleAddProduct}>
                        + Adicionar Produto
                    </button>
                </div>

                {/* Tabela de Produtos */}
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr className="table-header-row">
                                <th className="table-header">ID</th>
                                <th className="table-header">Nome</th>
                                <th className="table-header">Categoria</th>
                                <th className="table-header">Preço</th>
                                <th className="table-header">Estoque</th>
                                <th className="table-header">SKU</th>
                                <th className="table-header">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="table-row">
                                    <td className="table-cell">{product.id}</td>
                                    <td className="table-cell">{product.name}</td>
                                    <td className="table-cell">{product.category}</td>
                                    <td className="table-cell">
                                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="table-cell" style={{ color: product.stock < 10 ? '#ff6b6b' : '#a5d8ff' }}>
                                        {product.stock}
                                    </td>
                                    <td className="table-cell">{product.sku}</td>
                                    <td className="table-cell">
                                        <button className="action-button">Editar</button>
                                        <button className="action-button delete-button">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="pagination">
                    <button className="page-button">Anterior</button>
                    <span className="page-info">Página 1 de 1</span>
                    <button className="page-button">Próxima</button>
                </div>
            </main>
        </div>
    );
}

export default Products;