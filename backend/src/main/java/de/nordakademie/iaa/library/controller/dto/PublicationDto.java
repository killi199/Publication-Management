package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * A Publication is the main object for a library. It describes things like books, articles, etc.
 */
public class PublicationDto {

    private String key;

    @NotNull
    private String title;

    private List<AuthorDto> authors = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    private KindOfPublicationDto kindOfPublication;

    private String ISBN;

    private List<KeywordDto> keywords = new ArrayList<>();

    private int quantity;

    private boolean deleted = false;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<AuthorDto> getAuthors() {
        return authors;
    }

    public void setAuthors(List<AuthorDto> authors) {
        this.authors = authors;
    }

    public Date getDateOfPublication() {
        return dateOfPublication;
    }

    public void setDateOfPublication(Date dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public KindOfPublicationDto getKindOfPublication() {
        return kindOfPublication;
    }

    public void setKindOfPublication(KindOfPublicationDto kindOfPublications) {
        this.kindOfPublication = kindOfPublications;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public List<KeywordDto> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<KeywordDto> keywords) {
        this.keywords = keywords;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
