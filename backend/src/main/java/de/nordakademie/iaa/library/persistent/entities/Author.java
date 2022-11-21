package de.nordakademie.iaa.library.persistent.entities;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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

    @NotBlank
    @Length(max = 255)
    private String surname;
    @NotBlank
    @Length(max = 255)
    private String name;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST}, orphanRemoval = true)
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
