package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

/**
 * A Publication is the main object for a library. It describes things like books, articles, etc.
 */
@Entity
public class Publication {

    @Id
    private String key;

    @NotNull
    private String titel;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "author_publications",
            joinColumns = {@JoinColumn(name = "publication_key")},
            inverseJoinColumns = {@JoinColumn(name = "author_uuid")})
    private List<Author> author = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "kind_publications",
            joinColumns = {@JoinColumn(name = "publication_key")},
            inverseJoinColumns = {@JoinColumn(name = "kind_uuid")})
    private List<KindOfPublication> kindsOfPublication = new ArrayList<>();

    private String ISBN;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "keywords_publications",
            joinColumns = {@JoinColumn(name = "publication_key")},
            inverseJoinColumns = {@JoinColumn(name = "keyword_uuid")})
    private List<Keyword> keywords = new ArrayList<>();

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

    public List<Author> getAuthor() {
        return author;
    }

    public void setAuthor(List<Author> author) {
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

    public List<KindOfPublication> getKindsOfPublication() {
        return kindsOfPublication;
    }

    public void setKindsOfPublication(List<KindOfPublication> kindsOfPublication) {
        this.kindsOfPublication = kindsOfPublication;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public List<Keyword> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<Keyword> keywords) {
        this.keywords = keywords;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
