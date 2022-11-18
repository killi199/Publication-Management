package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
}
