package com.project.networktechnologiesproject.controller.loan;

import com.project.networktechnologiesproject.controller.loan.dto.CreateLoanDto;
import com.project.networktechnologiesproject.controller.loan.dto.CreateLoanResponseDto;
import com.project.networktechnologiesproject.controller.loan.dto.GetLoanResponseDto;
import com.project.networktechnologiesproject.controller.loan.dto.GetLoansPageResponseDto;
import com.project.networktechnologiesproject.service.loan.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/loans")
@PostAuthorize("isAuthenticated()")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService){
        this.loanService = loanService;
    }

    @GetMapping
    public ResponseEntity<GetLoansPageResponseDto> getAll(@RequestParam(required = false) Long userId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        GetLoansPageResponseDto dto = loanService.getAll(userId, page, size);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetLoanResponseDto> getOneById(@PathVariable long id) {
        GetLoanResponseDto dto = loanService.getOneById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CreateLoanResponseDto> create(@RequestBody @Validated CreateLoanDto loan){
        var newLoan = loanService.create(loan);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        loanService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
