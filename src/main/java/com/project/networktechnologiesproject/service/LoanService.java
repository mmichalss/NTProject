package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.*;
import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.BookRepository;
import com.project.networktechnologiesproject.infrastructure.repository.LoanRepository;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository, UserRepository userRepository){this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public List<GetLoanDto> getAll(){
        var loans = loanRepository.findAll();
        return loans.stream().map((loan) -> new GetLoanDto(loan.getId(), loan.getUser(), loan.getBook(), loan.getLoanDate(), loan.getDueDate(), loan.getReturn_date())).collect(Collectors.toList());
    }
    public GetLoanDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var loan = loanRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan with following id was not found: " + id));
        return new GetLoanDto(loan.getId(), loan.getUser(), loan.getBook(), loan.getLoanDate(), loan.getDueDate(), loan.getReturn_date());
    }
    public CreateLoanResponseDto create(CreateLoanDto loan){
        UserEntity user = userRepository.findById(loan.getUserId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with following id was not found: " + loan.getUserId()));
        BookEntity book = bookRepository.findById(loan.getBookId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with following id was not found: " + loan.getBookId()));


        var loanEntity = new LoanEntity();
        loanEntity.setUser(user);
        loanEntity.setBook(book);
        loanEntity.setLoanDate(new Date(System.currentTimeMillis()));
        loanEntity.setDueDate(loan.getDueDate());

        var newLoan = loanRepository.save(loanEntity);

        return new CreateLoanResponseDto(newLoan.getId(), newLoan.getUser().getId(), newLoan.getBook().getId(), newLoan.getLoanDate(), newLoan.getDueDate());

    }

    public void delete(long id){
        if (!loanRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan with following id was not found: " + id);
        }
        loanRepository.deleteById(id);
    }
}
