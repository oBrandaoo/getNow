package com.ideia.sw.GetNow.serviceImpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ideia.sw.GetNow.service.AudioProcessingService;

@Service
public class AudioProcessingServiceImpl implements AudioProcessingService {

    @Override
    public Map<String, String> processAudio(MultipartFile audioFile) {
        // Dados mockados - simula a resposta de uma API de processamento
        Map<String, String> mockResponse = new HashMap<>();
        
        mockResponse.put("amount", "245.90");
        mockResponse.put("type", "PURCHASE");
        mockResponse.put("description", "Compra de materiais de escritório");
        mockResponse.put("method", "CARD");
        mockResponse.put("category", "Despesas Operacionais");
        
        return mockResponse;
    }
}