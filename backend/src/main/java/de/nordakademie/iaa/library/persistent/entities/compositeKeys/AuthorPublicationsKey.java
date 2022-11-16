package de.nordakademie.iaa.library.persistent.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;


/**
 * Key for combined foreign key to make the many to many relation author and publications unique
 */
public class AuthorPublicationsKey implements Serializable {
    private String publication;

    private UUID author;

    public AuthorPublicationsKey(String publication, UUID author) {
        this.publication = publication;
        this.author = author;
    }
    public AuthorPublicationsKey() {}

    public String getPublicationKey() {
        return publication;
    }

    public void setPublicationKey(String publication) {
        this.publication = publication;
    }

    public UUID getAuthorUuid() {
        return author;
    }

    public void setAuthorUuid(UUID author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthorPublicationsKey that = (AuthorPublicationsKey) o;
        return publication.equals(that.publication) && author.equals(that.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(publication, author);
    }
}
