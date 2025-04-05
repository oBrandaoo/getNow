package com.ideia.sw.GetNow;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal valor; // ou "amount" se quiser manter o padrão em inglês
    private String tipo;      // exemplo: COMPRA, REEMBOLSO, CHARGEBACK
    private String status;    // exemplo: PENDENTE, CONCLUIDA, FALHOU
    private String metodo;    // exemplo: CARTAO, PIX, DINHEIRO
    private String descricao;

    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @PrePersist
    public void onCreate() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = this.criadoEm;
    }

    @PreUpdate
    public void onUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }

    public void setCreatedAt(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCreatedAt'");
    }
}
