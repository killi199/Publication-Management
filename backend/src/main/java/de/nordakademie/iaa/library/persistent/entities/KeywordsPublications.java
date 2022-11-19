package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.KeywordPublicationsKey;

import javax.persistence.*;


/**
 * Keyword Publication relation this is exact definition of the relation is needed so that a combined key can be defined.
 */
@Entity
@IdClass(KeywordPublicationsKey.class)
public class KeywordsPublications {

    public KeywordsPublications(Publication publication, Keyword keyword) {
        this.publication = publication;
        this.keyword = keyword;
    }

    public KeywordsPublications() {}


    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Publication publication;
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Keyword keyword;

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public Keyword getKeyword() {
        return keyword;
    }

    public void setKeyword(Keyword keyword) {
        this.keyword = keyword;
    }
}
