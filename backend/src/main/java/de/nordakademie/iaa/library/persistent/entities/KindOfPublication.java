package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.Column;
import javax.persistence.*;
import java.util.List;
import java.util.UUID;

/**
 * The Kind Of Publication organizes a Publication in different categories like: "book", "article", etc.
 */
@Entity
public class KindOfPublication {

    @Id
    @GeneratedValue
    private UUID uuid;

    @Column(unique = true)
    private String value;

    @OneToMany(mappedBy = "kindOfPublication",fetch = FetchType.LAZY)
    private List<Publication> publications;

    /**
     * Set kind of publication to null in every publication.
     */
    @PreRemove
    private void preRemove() {
        getPublications().forEach( publication -> publication.setKindOfPublication(null));
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public List<Publication> getPublications() {
        return publications;
    }

    public void setPublications(List<Publication> publications) {
        this.publications = publications;
    }
}
