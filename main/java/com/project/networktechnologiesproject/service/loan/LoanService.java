package com.project.networktechnologiesproject.service.loan;

import com.project.networktechnologiesproject.controller.book.dto.GetBookDto;
import com.project.networktechnologiesproject.controller.loan.dto.*;
import com.project.networktechnologiesproject.controller.user.dto.GetUserDto;
import com.project.networktechnologiesproject.infrastructure.book.BookEntity;
import com.project.networktechnologiesproject.infrastructure.loan.LoanEntity;
import com.project.networktechnologiesproject.infrastructure.user.UserEntity;
import com.project.networktechnologiesproject.infrastructure.auth.AuthRepository;
import com.project.networktechnologiesproject.infrastructure.book.BookRepository;
import com.project.networktechnologiesproject.infrastructure.loan.LoanRepository;
import com.project.networktechnologiesproject.infrastructure.user.UserRepository;
import com.project.networktechnologiesproject.service.auth.OwnershipService;
import com.project.networktechnologiesproject.service.book.error.BookWithIdNotFoundException;
import com.project.networktechnologiesproject.service.loan.error.LoanWithIdNotFoundException;
import com.project.networktechnologiesproject.service.loan.error.NoAvailableCopiesOfBookException;
import com.project.networktechnologiesproject.service.user.error.UserWithIdNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Service
public class LoanService extends OwnershipService
{
    private final LoanRepository loanRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository, UserRepository userRepository, AuthRepository authRepository){
        super(authRepository);
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    @PreAuthorize("hasRole('ADMIN') or isAuthenticated() and this.isOwner(authentication.name, #userId)")
    public GetLoansPageResponseDto getAll(Long userId, int page, int size){
        Page<LoanEntity> loansPage;

        Pageable pageable = PageRequest.of(page, size);

        if(userId == null){
            loansPage = loanRepository.findAll(pageable);
        } else {
            loansPage = loanRepository.findByUserId(userId, pageable);
        }
        List<GetLoanResponseDto> loansDto = loansPage.getContent().stream().map(this::mapLoan).toList();

        return new GetLoansPageResponseDto(loansDto, loansPage.getNumber(), loansPage.getTotalElements(), loansPage.getTotalPages(), loansPage.hasNext());
    }

    @PreAuthorize("hasRole('ADMIN') or isAuthenticated() and this.isOwner(authentication.name, #userId)")
    public GetLoansReturnedPageResponseDto getAllReturned(Long userId, int page, int size) {

        Page<LoanEntity> loansPage;

        Pageable pageable = PageRequest.of(page, size);

        if(userId == null){
            loansPage = loanRepository.findByReturnDateIsNotNull(pageable);
        } else {
            loansPage = loanRepository.findByUserIdAndReturnDateIsNotNull(userId, pageable);
        }
        List<GetLoanReturnedResponseDto> loansDto = loansPage.getContent().stream().map(this::mapLoanReturned).toList();

        return new GetLoansReturnedPageResponseDto(loansDto, loansPage.getNumber(), loansPage.getTotalElements(), loansPage.getTotalPages(), loansPage.hasNext());

    }

    @PostAuthorize("hasRole('ADMIN') or isAuthenticated() and this.isOwner(authentication.name, returnObject.user.id)")
    public GetLoanResponseDto getOneById(long id){
        LoanEntity loan = loanRepository.findById(id).orElseThrow(() -> LoanWithIdNotFoundException.create(id));
        return mapLoan(loan);
    }
    private GetLoanResponseDto mapLoan(LoanEntity loan){
        GetUserDto user = new GetUserDto(loan.getUser().getId(), loan.getUser().getEmail(), loan.getUser().getName(), loan.getUser().getLastName());
        GetBookDto book = new GetBookDto(loan.getBook().getId(), loan.getBook().getIsbn(), loan.getBook().getTitle(), loan.getBook().getAuthor(), loan.getBook().getPublisher(), loan.getBook().getYearPublished(), loan.getBook().getAvailableCopies() > 0);
        return new GetLoanResponseDto(loan.getId(), user, book, loan.getLoanDate(), loan.getDueDate());
    }

    private GetLoanReturnedResponseDto mapLoanReturned(LoanEntity loan){
        GetUserDto user = new GetUserDto(loan.getUser().getId(), loan.getUser().getEmail(), loan.getUser().getName(), loan.getUser().getLastName());
        GetBookDto book = new GetBookDto(loan.getBook().getId(), loan.getBook().getIsbn(), loan.getBook().getTitle(), loan.getBook().getAuthor(), loan.getBook().getPublisher(), loan.getBook().getYearPublished(), loan.getBook().getAvailableCopies() > 0);
        return new GetLoanReturnedResponseDto(loan.getId(), user, book, loan.getLoanDate(), loan.getDueDate(), loan.getReturnDate());
    }

    @PreAuthorize("hasRole('ADMIN') or isAuthenticated() and this.isOwner(authentication.name, #loan.userId)")
    public CreateLoanResponseDto create(CreateLoanDto loan){
        UserEntity user = userRepository.findById(loan.getUserId()).orElseThrow(()-> UserWithIdNotFoundException.create(loan.getUserId()));
        BookEntity book = bookRepository.findById(loan.getBookId()).orElseThrow(()-> BookWithIdNotFoundException.create(loan.getBookId()));


        var loanEntity = new LoanEntity();
        if (book.getAvailableCopies() > 0) {
            book.setAvailableCopies(book.getAvailableCopies() - 1);
            loanEntity.setUser(user);
            loanEntity.setBook(book);
            loanEntity.setLoanDate(new Date(System.currentTimeMillis()));
            loanEntity.setDueDate(loan.getDueDate());
            loanRepository.save(loanEntity);
        } else {
            throw(NoAvailableCopiesOfBookException.create(book.getId()));
        }

        return new CreateLoanResponseDto(loanEntity.getId(), loanEntity.getUser().getId(), loanEntity.getBook().getId(), loanEntity.getLoanDate(), loanEntity.getDueDate());

    }

    public void delete(long id){
        if (!loanRepository.existsById(id)){
            throw LoanWithIdNotFoundException.create(id);
        }
        loanRepository.deleteById(id);
    }

    public CreateLoanReturnedDto returnBook(long loanId) {
        LoanEntity loan = loanRepository.findById(loanId).orElseThrow(() -> LoanWithIdNotFoundException.create(loanId));
        loan.setReturnDate(new Date(System.currentTimeMillis()));
        loan.getBook().setAvailableCopies(loan.getBook().getAvailableCopies() + 1);

        loanRepository.save(loan);

        return new CreateLoanReturnedDto(loan.getId(), loan.getUser().getId(), loan.getBook().getId(), loan.getLoanDate(), loan.getDueDate(), loan.getReturnDate());
    }
}
