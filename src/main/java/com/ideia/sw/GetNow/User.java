package com.ideia.sw.GetNow;

import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;
    private String tipo; // "vendedor" ou "comprador"

    @OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL)
    private List<Product> produtos;

    // Getters e setters
}
