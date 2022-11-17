package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The Author describes a person that wrote a Publication
 */
@Entity
public class Author {
    @Id
    @GeneratedValue
    private UUID uuid;

    @NotNull
    private String surname;
    @NotNull
    private String name;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<AuthorsPublications> authorsPublications = new ArrayList<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<AuthorsPublications> getAuthorsPublications() {
        return authorsPublications;
    }

    public void setAuthorsPublications(List<AuthorsPublications> authorsPublications) {
        this.authorsPublications = authorsPublications;
    }
}
