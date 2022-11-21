package de.nordakademie.iaa.library.service.mapper.impl;

import de.nordakademie.iaa.library.controller.dto.AuthorDto;
import de.nordakademie.iaa.library.controller.dto.KeywordDto;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.AuthorsPublications;
import de.nordakademie.iaa.library.persistent.entities.KeywordsPublications;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.AuthorsPublicationsRepository;
import de.nordakademie.iaa.library.persistent.repository.KeywordsPublicationsRepository;
import de.nordakademie.iaa.library.service.mapper.AuthorMapper;
import de.nordakademie.iaa.library.service.mapper.KeywordMapper;
import de.nordakademie.iaa.library.service.mapper.KindOfPublicationMapper;
import de.nordakademie.iaa.library.service.mapper.PublicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Author: Thorge Früchtenicht
 * The implementation of this mapper is done manually to be able to set the authors and keywords directly.
 * This lowers the number of sql queries.
 */
@Component
public class PublicationMapperImpl implements PublicationMapper {

    AuthorMapper authorMapper;
    KindOfPublicationMapper kindOfPublicationMapper;
    KeywordMapper keywordMapper;

    AuthorsPublicationsRepository authorsPublicationsRepository;
    KeywordsPublicationsRepository keywordsPublicationsRepository;

    @Autowired
    public PublicationMapperImpl(AuthorMapper authorMapper,
                                 KindOfPublicationMapper kindOfPublicationMapper,
                                 KeywordMapper keywordMapper,
                                 AuthorsPublicationsRepository authorsPublicationsRepository,
                                 KeywordsPublicationsRepository keywordsPublicationsRepository) {
        this.authorMapper = authorMapper;
        this.kindOfPublicationMapper = kindOfPublicationMapper;
        this.keywordMapper = keywordMapper;
        this.authorsPublicationsRepository = authorsPublicationsRepository;
        this.keywordsPublicationsRepository = keywordsPublicationsRepository;
    }

    /**
     * Maps entity to dto
     * In this case the authors and keywords will be lazy loaded.
     * The preloading for only one entity isn't worth the complexity
     *
     * @param publication publication that should be mapped
     * @return the mapped publication
     */
    @Override
    public PublicationDto publicationEntityToDto(Publication publication) {

        PublicationDto publicationDto = publicationEntityToDtoWithoutRelations(publication);

        List<AuthorDto> authorDtos = authorMapper.authorEntitiesToDtos(publication.getAuthorsPublications()
                .stream().map(AuthorsPublications::getAuthor).collect(Collectors.toList()));
        publicationDto.setAuthors(authorDtos);

        List<KeywordDto> keywordDtos = keywordMapper.keywordEntitiesToDtos(publication.getKeywordsPublications()
                .stream().map(KeywordsPublications::getKeyword).collect(Collectors.toList()));

        publicationDto.setKeywords(keywordDtos);

        return publicationDto;
    }

    /**
     * maps everything except of authors and keywords relations
     *
     * @param publication publication that should be mapped
     * @return the mapped publication
     */
    private PublicationDto publicationEntityToDtoWithoutRelations(Publication publication) {
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey(publication.getKey());
        publicationDto.setTitle(publication.getTitle());
        publicationDto.setDateOfPublication(publication.getDateOfPublication());
        publicationDto.setPublisher(publication.getPublisher());
        publicationDto.setKindOfPublication(
                kindOfPublicationMapper.kindOfPublicationEntityToDto(publication.getKindOfPublication()));
        publicationDto.setIsbn(publication.getIsbn());
        publicationDto.setQuantity(publication.getQuantity());
        publicationDto.setDeleted(publication.isDeleted());

        return publicationDto;
    }

    /**
     * Maps dto to entity
     *
     * @param publicationDto publicationsDto that should be mapped
     * @return the mapped dto
     */
    @Override
    public Publication publicationDtoToEntity(PublicationDto publicationDto) {
        Publication publication = new Publication();
        publication.setKey(publicationDto.getKey());
        publication.setTitle(publicationDto.getTitle());
        publication.setDateOfPublication(publicationDto.getDateOfPublication());
        publication.setPublisher(publicationDto.getPublisher());
        publication.setKindOfPublication(
                kindOfPublicationMapper.kindOfPublicationDtoToEntity(publicationDto.getKindOfPublication()));
        publication.setIsbn(publicationDto.getIsbn());
        publication.setQuantity(publicationDto.getQuantity());

        publication.setKeywordsPublications(
                publicationDto.getKeywords().stream().map(
                                keyword -> new KeywordsPublications(publication, keywordMapper.keywordDtoToEntity(keyword)))
                        .collect(Collectors.toList()));

        publication.setAuthorsPublications(
                publicationDto.getAuthors().stream().map(
                                author -> new AuthorsPublications(publication, authorMapper.authorDtoToEntity(author)))
                        .collect(Collectors.toList()));

        return publication;
    }

    /**
     * Maps publications to publications dtos.
     * <p>
     * This method preloads all relations from the database to reduce the traffic caused by lazy loading.
     *
     * @param publications the list of publicationsthat should be mapped
     * @return the mapped list
     */
    @Override
    public List<PublicationDto> publicationEntitiesToDtos(List<Publication> publications) {

        if (publications == null) {
            return null;
        }

        List<AuthorsPublications> authorsPublications =  authorsPublicationsRepository.findAll();
        List<KeywordsPublications> keywordsPublications = keywordsPublicationsRepository.findAll();

        List<PublicationDto> publicationDtos = new ArrayList<>(publications.size());

        for (Publication publication : publications) {

            // map entity to dto
            PublicationDto publicationDto = publicationEntityToDtoWithoutRelations(publication);

            // splits the author relations to current publication from the rest
            Map<Boolean, List<AuthorsPublications>> authorSplit =
                    authorsPublications.stream()
                            .collect(Collectors.partitioningBy(
                                    ap -> ap.getPublication().getKey().equals(publication.getKey())));
            List<AuthorsPublications> authorsPublicationsOfPublication = authorSplit.get(true);
            authorsPublications = authorSplit.get(false);

            // splits the keywords relations to current publication from the rest
            Map<Boolean, List<KeywordsPublications>> keywordSplit =
                    keywordsPublications.stream()
                            .collect(Collectors.partitioningBy(
                                    ap -> ap.getPublication().getKey().equals(publication.getKey())));
            List<KeywordsPublications> keywordsPublicationsOfPublication = keywordSplit.get(true);
            keywordsPublications = keywordSplit.get(false);

            // maps the relation to authors
            List<AuthorDto> authorDtos = authorMapper.authorEntitiesToDtos(authorsPublicationsOfPublication
                    .stream().map(AuthorsPublications::getAuthor).collect(Collectors.toList()));

            // maps the relation to keywords
            List<KeywordDto> keywordDtos = keywordMapper.keywordEntitiesToDtos(keywordsPublicationsOfPublication
                    .stream().map(KeywordsPublications::getKeyword).collect(Collectors.toList()));

            // set authors and keywords
            publicationDto.setAuthors(authorDtos);
            publicationDto.setKeywords(keywordDtos);

            publicationDtos.add(publicationDto);
        }

        return publicationDtos;
    }
}
