package com.ideia.sw.GetNow;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private double preco;

    @ManyToOne
    @JoinColumn(name = "vendedor_id")
    private User vendedor;

    // Getters e setters
}
