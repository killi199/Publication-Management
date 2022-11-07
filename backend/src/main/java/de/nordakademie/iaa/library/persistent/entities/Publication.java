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
    private String title;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "author_publications",
            joinColumns = {@JoinColumn(name = "publication_key")},
            inverseJoinColumns = {@JoinColumn(name = "author_uuid")})
    private List<Author> authors = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    @ManyToOne
    private KindOfPublication kindOfPublication;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
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

    public KindOfPublication getKindOfPublication() {
        return kindOfPublication;
    }

    public void setKindOfPublication(KindOfPublication kindOfPublication) {
        this.kindOfPublication = kindOfPublication;
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
