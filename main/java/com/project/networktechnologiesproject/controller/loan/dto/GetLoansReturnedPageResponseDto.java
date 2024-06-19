package com.project.networktechnologiesproject.controller.loan.dto;

import java.sql.Date;
import java.util.List;

public class GetLoansReturnedPageResponseDto {
    private List<GetLoanReturnedResponseDto> loans;
    private int currentPage;
    private long totalItems;
    private int totalPages;
    private boolean hasMore;

    public GetLoansReturnedPageResponseDto(List<GetLoanReturnedResponseDto> loans, int currentPage, long totalItems, int totalPages, boolean hasMore) {
        this.loans = loans;
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.hasMore = hasMore;
    }

    public List<GetLoanReturnedResponseDto> getLoans() {
        return loans;
    }

    public void setLoans(List<GetLoanReturnedResponseDto> loans) {
        this.loans = loans;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean isHasMore() {
        return hasMore;
    }

    public void setHasMore(boolean hasMore) {
        this.hasMore = hasMore;
    }
}
