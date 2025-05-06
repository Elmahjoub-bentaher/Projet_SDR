package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
