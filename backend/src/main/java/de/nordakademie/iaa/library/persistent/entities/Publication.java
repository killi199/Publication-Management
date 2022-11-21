package de.nordakademie.iaa.library.persistent.entities;

import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Author: Thorge Früchtenicht
 *
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

    @OneToMany(mappedBy = "publication", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AuthorsPublications> authorsPublications;

    private Date dateOfPublication;

    private String publisher;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private KindOfPublication kindOfPublication;

    private String isbn;

    @OneToMany(mappedBy = "publication", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordsPublications> keywordsPublications;


    @Column(columnDefinition = "integer default 0")
    private int quantity;

    @NotNull
    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    /**
     * On Update set deleted false
     */
    @PreUpdate
    public void preUpdate() {
        this.deleted = false;
    }

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

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public List<KeywordsPublications> getKeywordsPublications() {
        return keywordsPublications;
    }

    public void setKeywordsPublications(List<KeywordsPublications> keywordsPublications) {
        this.keywordsPublications = keywordsPublications;
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
