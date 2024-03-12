package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;
import com.project.networktechnologiesproject.infrastructure.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository){this.loanRepository = loanRepository;}

    public List<LoanEntity> getAll(){
        return loanRepository.findAll();
    }
    public LoanEntity getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        return loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public LoanEntity create(LoanEntity loan){
        return loanRepository.save(loan);
    }

    public void delete(long id){
        if (!loanRepository.existsById(id)){
            throw new RuntimeException();
        }
        loanRepository.deleteById(id);
    }
}
