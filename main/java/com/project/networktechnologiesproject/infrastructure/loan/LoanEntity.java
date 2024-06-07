package com.project.networktechnologiesproject.infrastructure.loan;

import com.project.networktechnologiesproject.infrastructure.book.BookEntity;
import com.project.networktechnologiesproject.infrastructure.user.UserEntity;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "loans", schema = "library")
public class LoanEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false, nullable = false)
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "book_id", updatable = false, nullable = false)
    private BookEntity book;
    @Basic
    @Column(name = "loan_date", nullable = false)
    private Date loanDate;
    @Basic
    @Column(name = "due_date", nullable = false)
    private Date dueDate;
    @Basic
    @Column(name = "return_date")
    private Date return_date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Date return_date) {
        this.return_date = return_date;
    }
}
