package com.ideia.sw.GetNow.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ideia.sw.GetNow.Transaction;
import com.ideia.sw.GetNow.User;
import com.ideia.sw.GetNow.Repositories.TransactionRepository;
import com.ideia.sw.GetNow.Repositories.UserRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                            UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public Transaction createTransaction(Long userId, Transaction transaction) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }
}