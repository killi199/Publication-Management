package de.nordakademie.iaa.library.persistent.entities;


import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Keywords can be used to describe a Publication with some simple words in a abstract form.
 */
@Entity
public class Keyword {
    @Id
    @GeneratedValue
    private UUID uuid;

    @NotBlank
    @Length(max = 255)
    @Column(unique = true)
    private String value;

    @OneToMany(mappedBy = "keyword", fetch = FetchType.LAZY, cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<KeywordsPublications> keywordsPublications = new ArrayList<>();

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

    public List<KeywordsPublications> getKeywordsPublications() {
        return keywordsPublications;
    }

    public void setKeywordsPublications(List<KeywordsPublications> keywordsPublications) {
        this.keywordsPublications = keywordsPublications;
    }
}
