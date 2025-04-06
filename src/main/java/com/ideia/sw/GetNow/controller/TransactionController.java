package com.ideia.sw.GetNow.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ideia.sw.GetNow.Transaction;
import com.ideia.sw.GetNow.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/process-audio")
    public ResponseEntity<Transaction> mockProcessAudioTransaction(
            @RequestParam(value = "audio", required = false) MultipartFile audioFile,
            @RequestParam("userId") Long userId) {

        Transaction mockTransaction = new Transaction();
        mockTransaction.setAmount(new BigDecimal("245.90"));
        mockTransaction.setAmountBrute(new BigDecimal("200.00"));
        mockTransaction.setType("PURCHASE");
        mockTransaction.setMethod("CARD");
        mockTransaction.setDescription("Compra mockada de materiais de escritório");
        mockTransaction.setStatus("COMPLETED");

        Transaction savedTransaction = transactionService.createTransaction(
                userId != null ? userId : 1L,
                mockTransaction);

        return ResponseEntity.ok(savedTransaction);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction,
            @RequestParam(value = "userId", required = false) Long userId) {

        Long resolvedUserId = userId != null ? userId : 1L;
        Transaction savedTransaction = transactionService.createTransaction(resolvedUserId, transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
