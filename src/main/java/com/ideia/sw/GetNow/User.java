package com.ideia.sw.GetNow;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role; // "seller" or "buyer"

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
    private List<Product> products;
}