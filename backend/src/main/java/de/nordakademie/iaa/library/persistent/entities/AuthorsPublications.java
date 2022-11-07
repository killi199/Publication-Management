package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.AuthorPublicationsKey;

import javax.persistence.*;


/**
 * Author Publication relation
 */
@Entity
public class AuthorsPublications {

    public AuthorsPublications(Publication publication, Author author) {
        this.publication = publication;
        this.author = author;
    }

    public AuthorsPublications() {}

    @EmbeddedId
    private AuthorPublicationsKey authorPublicationsKey;

    @MapsId("publicationKey")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_key")
    private Publication publication;

    @MapsId("authorUuid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_uuid")
    private Author author;


    public AuthorPublicationsKey getAuthorPublicationsKey() {
        return authorPublicationsKey;
    }

    public void setAuthorPublicationsKey(AuthorPublicationsKey authorPublicationsKey) {
        this.authorPublicationsKey = authorPublicationsKey;
    }

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
