package com.project.networktechnologiesproject.infrastructure.user;

import com.project.networktechnologiesproject.infrastructure.loan.LoanEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users", schema = "library")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column
    private String lastName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<LoanEntity> loans;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<LoanEntity> getLoans() {
        return loans;
    }

    public void setLoans(List<LoanEntity> loans) {
        this.loans = loans;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
