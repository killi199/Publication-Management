package de.nordakademie.iaa.library.persistent.entities;

import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A Publication is the main object for a library. It describes things like books, articles, etc.
 * A Publication can only be softly deleted. Caused by its correlation to the assignments and the fact that we want to
 * show all historical assignments.
 * A deleted publication has always a quantity of 0.
 * We also will not set a standard behavior that only the not deleted publications will be visible.
 * This is only relevant for one Endpoint and for this one we will write an own query.
 */
@Entity
@SQLDelete(sql = "UPDATE publication SET deleted=true, quantity=0 WHERE key=?")
public class Publication {

    @Id
    private String key;

    @NotNull
    private String title;

    @OneToMany(mappedBy = "publication", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<AuthorsPublications> authorsPublications = new ArrayList<>();

    private Date dateOfPublication;

    private String publisher;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private KindOfPublication kindOfPublication;

    private String ISBN;

    @OneToMany(mappedBy = "publication", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<KeywordsPublications> keywordsPublications = new ArrayList<>();


    @Column(columnDefinition = "integer default 0")
    private int quantity;

    @NotNull
    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
