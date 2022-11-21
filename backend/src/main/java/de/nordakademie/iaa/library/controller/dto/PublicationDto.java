package de.nordakademie.iaa.library.controller.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.*;
import static de.nordakademie.iaa.library.helper.StringTrimmer.trimIfNotNull;

/**
 * A Publication is the main object for a library. It describes things like books, articles, etc.
 */
public class PublicationDto {

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String key;

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String title;

    @Valid
    private List<AuthorDto> authors = new ArrayList<>();

    private Date dateOfPublication;

    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String publisher;

    @Valid
    private KindOfPublicationDto kindOfPublication;

    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String isbn;

    @Valid
    private List<KeywordDto> keywords = new ArrayList<>();

    @PositiveOrZero(message = NEGATIVE_VALUE_NOT_ALLOWED)
    private int quantity;

    private boolean deleted = false;

    public String getKey() {
        return key;
    }

    /**
     * Sets the key of the publication and trims it.
     *
     * @param key The key of the publication.
     */
    public void setKey(String key) {
        this.key = trimIfNotNull(key);
    }

    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the publication and trims it.
     *
     * @param title The title of the publication.
     */
    public void setTitle(String title) {
        this.title = trimIfNotNull(title);
    }

    public List<AuthorDto> getAuthors() {
        return authors;
    }

    public void setAuthors(List<AuthorDto> authors) {
        this.authors = authors;
    }

    public Date getDateOfPublication() {
        return dateOfPublication;
    }

    public void setDateOfPublication(Date dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public String getPublisher() {
        return publisher;
    }

    /**
     * Sets the publisher of the publication and trims it.
     *
     * @param publisher The publisher of the publication.
     */
    public void setPublisher(String publisher) {
        this.publisher = trimIfNotNull(publisher);
    }

    public KindOfPublicationDto getKindOfPublication() {
        return kindOfPublication;
    }

    public void setKindOfPublication(KindOfPublicationDto kindOfPublications) {
        this.kindOfPublication = kindOfPublications;
    }

    public String getIsbn() {
        return isbn;
    }

    /**
     * Sets the ISBN of the publication and trims it.
     *
     * @param isbn The ISBN of the publication.
     */
    public void setIsbn(String isbn) {
        this.isbn = trimIfNotNull(isbn);
    }

    public List<KeywordDto> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<KeywordDto> keywords) {
        this.keywords = keywords;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
