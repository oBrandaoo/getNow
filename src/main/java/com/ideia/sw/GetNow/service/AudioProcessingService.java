package com.ideia.sw.GetNow.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface AudioProcessingService {
    Map<String, String> processAudio(MultipartFile audioFile);
}