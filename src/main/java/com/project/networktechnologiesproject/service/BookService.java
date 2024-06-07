package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.CreateBookDto;
import com.project.networktechnologiesproject.controller.dto.CreateBookResponseDto;
import com.project.networktechnologiesproject.controller.dto.GetBookDto;
import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired //Spring will choose which implementation to use and pass it into this function.
    // Dependency injection (using an instance which is created outside the class)
    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }
    public List<GetBookDto> getAll(){
        var books = bookRepository.findAll();
        return books.stream().map((book) -> new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getYearPublished(), book.getAvailableCopies() > 0)).collect(Collectors.toList());
    }
    public GetBookDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getYearPublished(), book.getAvailableCopies() > 0);}

    public CreateBookResponseDto create(CreateBookDto book){
        var bookEntity = new BookEntity();
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setIsbn(book.getIsbn());
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAvailableCopies(book.getAvailableCopies());
        bookEntity.setYearPublished(book.getYearPublished());
        bookEntity.setPublisher(book.getPublisher());
        var newBook = bookRepository.save(bookEntity);

        return new CreateBookResponseDto(newBook.getId(), newBook.getIsbn(), newBook.getAuthor(), newBook.getTitle(), newBook.getPublisher(), newBook.getYearPublished(), newBook.getAvailableCopies());
    }

    public void delete(long id){
        if (!bookRepository.existsById(id)){
            throw new RuntimeException();
        }
        bookRepository.deleteById(id);
    }
}
