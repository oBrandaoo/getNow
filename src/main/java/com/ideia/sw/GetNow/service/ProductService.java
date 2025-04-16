package com.ideia.sw.GetNow.service;

import java.util.List;
import java.util.Optional;

import com.ideia.sw.GetNow.Product;

public interface ProductService {
    Product createProduct(Long userId, Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    Optional<Product> updateProduct(Long id, Product updatedProduct);
    boolean deleteProduct(Long id);
}
