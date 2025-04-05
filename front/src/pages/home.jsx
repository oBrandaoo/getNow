import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://picsum.photos/id/1018/800/400',
        'https://picsum.photos/id/1015/800/400',
        'https://picsum.photos/id/1016/800/400',
        'https://picsum.photos/id/1019/800/400',
        'https://picsum.photos/id/1020/800/400',
    ];

    const navItems = [
        { name: 'Produtos', path: '/products' },
        { name: 'Serviços', path: '/services' },
        { name: 'Sobre', path: '/about' },
        { name: 'Contato', path: '/contact' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(newIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.scrollBehavior = 'smooth';
            carouselRef.current.scrollLeft = currentIndex * carouselRef.current.offsetWidth;
        }
    }, [currentIndex]);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavClick = (path) => {
        navigate(path);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.navbar}>
                <div style={styles.navLeft}>
                    <h1 style={styles.logo}>GetNow</h1>
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

            {/* Conteúdo Principal */}
            <main style={styles.mainContent}>
                {/* Carrossel */}
                <div style={styles.carouselWrapper}>
                    <button
                        style={{ ...styles.carouselArrow, left: '20px' }}
                        onClick={goToPrev}
                    >
                        <span style={styles.arrowIcon}>&lt;</span>
                    </button>

                    <div style={styles.carouselContainer} ref={carouselRef}>
                        {images.map((src, index) => (
                            <div key={index} style={styles.carouselSlide}>
                                <img src={src} alt={`Imagem ${index}`} style={styles.image} />
                            </div>
                        ))}
                    </div>

                    <button
                        style={{ ...styles.carouselArrow, right: '20px' }}
                        onClick={goToNext}
                    >
                        <span style={styles.arrowIcon}>&gt;</span>
                    </button>
                </div>

                {/* Indicadores do Carrossel */}
                <div style={styles.carouselIndicators}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            style={{
                                ...styles.indicator,
                                ...(index === currentIndex && styles.activeIndicator)
                            }}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                {/* Seção de Destaques */}
                <section style={styles.featuredSection}>
                    <h2 style={styles.sectionTitle}>Destaques</h2>
                    <div style={styles.featuredGrid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} style={styles.featuredItem}>
                                <div style={styles.featuredImage}></div>
                                <h3 style={styles.featuredTitle}>Produto {item}</h3>
                                <p style={styles.featuredDesc}>Descrição do produto destacado</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // Gradiente escuro
        fontFamily: 'Arial, sans-serif',
        color: '#f0f0f0', // Texto mais claro
        overflowX: 'hidden',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: 'rgba(15, 15, 15, 0.8)', // Preto semi-transparente
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Borda sutil
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
        color: '#f0f0f0', // Texto claro
        fontSize: '16px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover sutil
        },
    },
    logoutButton: {
        padding: '10px 16px',
        fontSize: '14px',
        borderRadius: '8px',
        backgroundColor: '#3a7bd5', // Azul mais vibrante
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#2c5fb3', // Azul mais escuro no hover
        },
    },
    mainContent: {
        padding: '20px 40px',
        position: 'relative',
    },
    carouselWrapper: {
        position: 'relative',
        marginBottom: '40px',
        overflow: 'hidden',
        borderRadius: '16px',
    },
    carouselContainer: {
        display: 'flex',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        height: '400px',
        width: '100%',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    carouselSlide: {
        minWidth: '100%',
        height: '100%',
        flexShrink: 0,
        transition: 'transform 0.5s ease',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    carouselArrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(58, 123, 213, 0.8)', // Azul
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(58, 123, 213, 1)', // Azul sólido
            transform: 'translateY(-50%) scale(1.1)',
        },
    },
    arrowIcon: {
        display: 'block',
        marginTop: '-2px',
    },
    carouselIndicators: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
    },
    indicator: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'all 0.3s ease',
    },
    activeIndicator: {
        backgroundColor: '#3a7bd5', // Azul
        transform: 'scale(1.3)',
    },
    featuredSection: {
        marginTop: '40px',
    },
    sectionTitle: {
        fontSize: '28px',
        marginBottom: '20px',
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)', // Borda sutil
        paddingBottom: '10px',
        color: '#ffffff', // Branco puro para títulos
    },
    featuredGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    featuredItem: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)', // Fundo escuro
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(5px)',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)', // Sombra no hover
        },
    },
    featuredImage: {
        width: '100%',
        height: '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Cinza muito claro
        borderRadius: '8px',
        marginBottom: '15px',
    },
    featuredTitle: {
        fontSize: '18px',
        margin: '0 0 10px 0',
    },
    featuredDesc: {
        fontSize: '14px',
        margin: 0,
        opacity: 0.8,
    },
};

export default Home;