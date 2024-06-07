package com.project.networktechnologiesproject.infrastructure.repository;

import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {}
