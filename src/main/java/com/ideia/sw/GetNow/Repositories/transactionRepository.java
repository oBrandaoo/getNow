package com.ideia.sw.GetNow.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideia.sw.GetNow.Transaction;

@Repository
public interface transactionRepository extends JpaRepository<Transaction, Long> {
    
    List<Transaction> findByUsuarioId(Long usuarioId);
    List<Transaction> findByStatus(String status);
}