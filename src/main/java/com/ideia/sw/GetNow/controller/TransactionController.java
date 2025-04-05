package com.ideia.sw.GetNow.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideia.sw.GetNow.Transaction;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private SpeechToTextService sttService;
    
    @Autowired
    private Transaction transactionRepo;

    @PostMapping
    public ResponseEntity<?> createTransaction(
            @RequestBody Transaction request,
            @RequestHeader("Authorization") String token) {
        
        if (!jwtValidator.validate(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Transaction transaction = new Transaction();
        try {
            Transaction data = TransactionParser.parse(request.getAudioTranscript());
            
            transaction.setAmount(data.getAmount());
            transaction.setDescription(data.getDescription());
            transaction.setCategory(data.getCategory());
            transaction.setCreatedAt(LocalDateTime.now());
            
            transactionRepo.save(transaction);
            
            return ResponseEntity.ok().build();
            
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Erro ao processar transação: " + e.getMessage());
        }
    }
}