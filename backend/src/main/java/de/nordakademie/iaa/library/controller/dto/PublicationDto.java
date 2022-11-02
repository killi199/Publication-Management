package de.nordakademie.iaa.library.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * A publication is the main object for a library. It describes thinks like books, articles, etc.
 */
public class PublicationDto {

    private String key;

    private String titel;

    private List<AuthorDto> author = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    private List<KindOfPublicationDto> kindsOfPublication = new ArrayList<>();

    @JsonProperty("ISBN")
    private String ISBN;

    private List<KeywordDto> keywords = new ArrayList<>();

    private int quantity;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public List<AuthorDto> getAuthor() {
        return author;
    }

    public void setAuthor(List<AuthorDto> author) {
        this.author = author;
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

    public List<KindOfPublicationDto> getKindsOfPublication() {
        return kindsOfPublication;
    }

    public void setKindsOfPublication(List<KindOfPublicationDto> kindOfPublications) {
        this.kindsOfPublication = kindOfPublications;
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
}
