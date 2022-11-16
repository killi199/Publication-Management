package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

/**
 * A Publication is the main object for a library. It describes things like books, articles, etc.
 */
@Entity
public class Publication {

    @Id
    private String key;

    @NotNull
    private String title;

    @OneToMany(mappedBy = "publication", fetch = FetchType.LAZY, cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<AuthorsPublications> authorsPublications = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL} )
    private KindOfPublication kindOfPublication;

    private String ISBN;

    @OneToMany(mappedBy = "publication", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordsPublications> keywordsPublications = new ArrayList<>();

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

    public List<AuthorsPublications> getAuthorsPublications() {
        return authorsPublications;
    }

    public void setAuthorsPublications(List<AuthorsPublications> authorsPublications) {
        this.authorsPublications = authorsPublications;
    }

    @Transient
    public List<Author> getAuthors() {
        return getAuthorsPublications().stream().map(AuthorsPublications::getAuthor).collect(Collectors.toList());
    }

    @Transient
    public void setAuthors(List<Author> authors) {
        setAuthorsPublications(authors.stream().map(author -> new AuthorsPublications(this, author)).collect(Collectors.toList()));
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

    public List<KeywordsPublications> getKeywordsPublications() {
        return keywordsPublications;
    }

    public void setKeywordsPublications(List<KeywordsPublications> keywordsPublications) {
        this.keywordsPublications = keywordsPublications;
    }

    @Transient
    public List<Keyword> getKeywords() {
        return getKeywordsPublications().stream().map(KeywordsPublications::getKeyword).collect(Collectors.toList());
    }

    @Transient
    public void setKeywords(List<Keyword> keywords) {
        setKeywordsPublications(keywords.stream().map(keyword -> new KeywordsPublications(this, keyword)).collect(Collectors.toList()));
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
