package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.PublicationRepository;
import de.nordakademie.iaa.library.service.mapper.PublicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationService {

    private final PublicationRepository publicationRepository;

    private final PublicationMapper publicationMapper;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository, PublicationMapper publicationMapper) {
        this.publicationRepository = publicationRepository;
        this.publicationMapper = publicationMapper;
    }

    public List<PublicationDto> getAll() {
        List<Publication> publications = publicationRepository.findAll();
        return publicationMapper.publicationEntitiesToDtos(publications);
    }

    public PublicationDto create(PublicationDto publicationDto) {

        if (publicationDto.getKey() == null) {
            throw new MissingFieldException("key");
        }

        if (publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityAlreadyExistsException();
        }

        return createOrUpdate(publicationDto);
    }

    public PublicationDto update(PublicationDto publicationDto) {

        if (publicationDto.getKey() == null) {
            throw new MissingFieldException("key");
        }

        if (!publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(publicationDto);
    }

    public void delete(String key) {
        if (key == null) {
            throw new MissingFieldException("key");
        }

        Publication publication = new Publication();
        publication.setKey(key);

        publicationRepository.delete(publication);
    }

    private PublicationDto createOrUpdate(PublicationDto publicationDto) {
        Publication publication = publicationMapper.publicationDtoToEntity(publicationDto);

        return publicationMapper.publicationEntityToDto(publicationRepository.save(publication));
    }
}
