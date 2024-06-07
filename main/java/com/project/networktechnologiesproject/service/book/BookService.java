package com.project.networktechnologiesproject.service.book;

import com.project.networktechnologiesproject.controller.book.dto.CreateBookDto;
import com.project.networktechnologiesproject.controller.book.dto.CreateBookResponseDto;
import com.project.networktechnologiesproject.controller.book.dto.GetBookDto;
import com.project.networktechnologiesproject.infrastructure.book.BookEntity;
import com.project.networktechnologiesproject.infrastructure.book.BookRepository;
import com.project.networktechnologiesproject.service.book.error.BookWithIdNotFoundException;
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
        return books.stream().map(this::mapBook).collect(Collectors.toList());
    }
    public GetBookDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var book = bookRepository.findById(id).orElseThrow(() -> BookWithIdNotFoundException.create(id));
        return mapBook(book);
    }

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

    private GetBookDto mapBook(BookEntity book){
        return new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getYearPublished(), book.getAvailableCopies() > 0);
    }

    public void delete(long id){
        if (!bookRepository.existsById(id)){
            throw BookWithIdNotFoundException.create(id);
        }
        bookRepository.deleteById(id);
    }
}
