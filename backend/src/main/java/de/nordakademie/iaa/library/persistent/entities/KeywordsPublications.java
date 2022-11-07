package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.persistent.entities.compositeKeys.KeywordPublicationsKey;

import javax.persistence.*;


/**
 * Keyword Publication relation
 */
@Entity
public class KeywordsPublications {

    public KeywordsPublications(Publication publication, Keyword keyword) {
        this.publication = publication;
        this.keyword = keyword;
    }

    public KeywordsPublications() {}

    @EmbeddedId
    private KeywordPublicationsKey keywordPublicationsKey;

    @MapsId("publicationKey")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_key")
    private Publication publication;

    @MapsId("keywordUuid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "keyword_uuid")
    private Keyword keyword;

    public KeywordPublicationsKey getKeywordPublicationsKey() {
        return keywordPublicationsKey;
    }

    public void setKeywordPublicationsKey(KeywordPublicationsKey keywordPublicationsKey) {
        this.keywordPublicationsKey = keywordPublicationsKey;
    }

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
