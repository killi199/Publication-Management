package de.nordakademie.iaa.library.persistent.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;


/**
 * Author: Thorge Früchtenicht
 * Key for combined foreign key to make the many to many relation keyword and publications unique
 */
public class KeywordPublicationsKey implements Serializable {

    private String publication;

    private UUID keyword;

    public KeywordPublicationsKey(String publication, UUID keyword) {
        this.publication = publication;
        this.keyword = keyword;
    }

    public KeywordPublicationsKey() {}

    public String getPublicationKey() {
        return publication;
    }

    public void setPublicationKey(String publication) {
        this.publication = publication;
    }

    public UUID getKeywordUuid() {
        return keyword;
    }

    public void setKeywordUuid(UUID keyword) {
        this.keyword = keyword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KeywordPublicationsKey that = (KeywordPublicationsKey) o;
        return publication.equals(that.publication) && keyword.equals(that.keyword);
    }

    @Override
    public int hashCode() {
        return Objects.hash(publication, keyword);
    }
}
