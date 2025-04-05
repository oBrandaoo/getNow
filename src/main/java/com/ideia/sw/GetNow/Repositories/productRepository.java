package com.ideia.sw.GetNow.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Product;

import java.util.List;

public interface productRepository extends JpaRepository<Product, Long> {
    List<Product> findByVendedorId(Long vendedorId);
}
