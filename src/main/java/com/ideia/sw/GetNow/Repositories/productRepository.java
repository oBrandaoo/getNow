package com.ideia.sw.GetNow.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideia.sw.GetNow.Product;

import java.util.List;

@Repository
public interface productRepository extends JpaRepository<Product, Long> {
}
