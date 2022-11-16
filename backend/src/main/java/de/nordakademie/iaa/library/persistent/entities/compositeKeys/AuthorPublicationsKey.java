package de.nordakademie.iaa.library.persistent.entities.compositeKeys;

import org.hibernate.annotations.Type;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;


/**
 * Key for combined foreign key to make the many to many relation author and publications unique
 */
@Embeddable
public class AuthorPublicationsKey implements Serializable {
    private String publicationKey;

    @Type(type="org.hibernate.type.UUIDCharType")
    private UUID authorUuid;


    public String getPublicationKey() {
        return publicationKey;
    }

    public void setPublicationKey(String publicationKey) {
        this.publicationKey = publicationKey;
    }

    public UUID getAuthorUuid() {
        return authorUuid;
    }

    public void setAuthorUuid(UUID authorUuid) {
        this.authorUuid = authorUuid;
    }
}
