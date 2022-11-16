package de.nordakademie.iaa.library.persistent.entities.compositeKeys;

import org.hibernate.annotations.Type;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;


/**
 * Key for combined foreign key to make the many to many relation keyword and publications unique
 */
@Embeddable
public class KeywordPublicationsKey implements Serializable {

    private String publicationKey;

    @Type(type="org.hibernate.type.UUIDCharType")
    private UUID keywordUuid;


    public String getPublicationKey() {
        return publicationKey;
    }

    public void setPublicationKey(String publicationKey) {
        this.publicationKey = publicationKey;
    }

    public UUID getKeywordUuid() {
        return keywordUuid;
    }

    public void setKeywordUuid(UUID keywordUuid) {
        this.keywordUuid = keywordUuid;
    }

}
