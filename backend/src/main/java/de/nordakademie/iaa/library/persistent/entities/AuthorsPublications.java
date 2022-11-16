package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.AuthorPublicationsKey;

import javax.persistence.*;


/**
 * Author Publication relation
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
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Publication publication;

    @Id
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
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
