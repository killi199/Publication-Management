package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.AuthorPublicationsKey;

import javax.persistence.*;


/**
 * Author Publication relation this is exact definition of the relation is needed so that a combined key can be defined.
 */
@Entity
@IdClass(AuthorPublicationsKey.class)
public class AuthorsPublications {

    public AuthorsPublications(Publication publication, Author author) {
        this.publication = publication;
        this.author = author;
    }

    public AuthorsPublications() {}


    @Id
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private Publication publication;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private Author author;


    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}
