package com.project.networktechnologiesproject.infrastructure.repository;

import com.project.networktechnologiesproject.controller.AuthController;
import com.project.networktechnologiesproject.infrastructure.entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthEntity, Long> {
    Optional<AuthEntity> findByUsername(String username);
}
