package com.ideia.sw.GetNow.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

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
import com.ideia.sw.GetNow.service.AudioProcessingService;
import com.ideia.sw.GetNow.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final AudioProcessingService audioProcessingService;

    public TransactionController(TransactionService transactionService,
            AudioProcessingService audioProcessingService) {
        this.transactionService = transactionService;
        this.audioProcessingService = audioProcessingService;
    }

    @PostMapping("/process-audio")
    public ResponseEntity<Map<String, String>> processAudioTransaction(
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam("userId") Long userId) {

        System.out.println(
                "Arquivo recebido: " + audioFile.getOriginalFilename() + " (" + audioFile.getSize() + " bytes)");

        // Simulação de processamento
        Map<String, String> mockResponse = new HashMap<>();
        mockResponse.put("amount", "245.90");
        mockResponse.put("type", "PURCHASE");
        mockResponse.put("description", "Compra de materiais de escritório");
        mockResponse.put("method", "CARD");

        return ResponseEntity.ok(mockResponse); // Sempre retorna sucesso
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction,
            @RequestParam Long userId) {
        Transaction savedTransaction = transactionService.createTransaction(userId, transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
