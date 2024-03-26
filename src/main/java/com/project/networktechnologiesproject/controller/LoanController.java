package com.project.networktechnologiesproject.controller;

import com.project.networktechnologiesproject.controller.dto.CreateLoanDto;
import com.project.networktechnologiesproject.controller.dto.CreateLoanResponseDto;
import com.project.networktechnologiesproject.controller.dto.GetLoanDto;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;
import com.project.networktechnologiesproject.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/loans")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService){
        this.loanService = loanService;
    }

    @GetMapping
    public List<GetLoanDto> getAll(){
        return loanService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public GetLoanDto getOne(@PathVariable long id) {
        return loanService.getOne(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateLoanResponseDto> create(@RequestBody CreateLoanDto loan){
        var newLoan = loanService.create(loan);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable long id){
        loanService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
