package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.KeywordPublicationsKey;

import javax.persistence.*;


/**
 * Keyword Publication relation
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
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Publication publication;
    @Id
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
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
