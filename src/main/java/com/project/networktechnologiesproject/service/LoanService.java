package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.*;
import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;
import com.project.networktechnologiesproject.infrastructure.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository){this.loanRepository = loanRepository;}

    public List<GetLoanDto> getAll(){
        var loans = loanRepository.findAll();
        return loans.stream().map((loan) -> new GetLoanDto(loan.getId(), loan.getUser(), loan.getBook(), loan.getLoanDate(), loan.getDueDate(), loan.getReturn_date())).collect(Collectors.toList());
    }
    public GetLoanDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var loan = loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
        return new GetLoanDto(loan.getId(), loan.getUser(), loan.getBook(), loan.getLoanDate(), loan.getDueDate(), loan.getReturn_date());
    }
    public CreateLoanResponseDto create(CreateLoanDto loan){
        var loanEntity = new LoanEntity();
        loanEntity.setUser(loan.getUser());
        loanEntity.setBook(loan.getBook());
        loanEntity.setLoanDate(loan.getLoanDate());
        loanEntity.setDueDate(loan.getDueDate());
        loanEntity.setReturn_date(loan.getReturn_date());
        var newLoan = loanRepository.save(loanEntity);

        return new CreateLoanResponseDto(newLoan.getId(), newLoan.getUser(), newLoan.getBook(), newLoan.getLoanDate(), newLoan.getDueDate(), newLoan.getReturn_date());

    }

    public void delete(long id){
        if (!loanRepository.existsById(id)){
            throw new RuntimeException();
        }
        loanRepository.deleteById(id);
    }
}
