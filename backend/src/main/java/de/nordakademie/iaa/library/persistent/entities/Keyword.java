package de.nordakademie.iaa.library.persistent.entities;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @Column(unique = true)
    @NotNull
    private String value;

    @OneToMany(mappedBy = "keyword", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST}, orphanRemoval = true)
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
