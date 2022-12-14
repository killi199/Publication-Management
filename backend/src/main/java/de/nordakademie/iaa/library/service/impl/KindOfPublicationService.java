package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.dto.KindOfPublicationDto;
import de.nordakademie.iaa.library.persistent.entities.KindOfPublication;
import de.nordakademie.iaa.library.persistent.repository.KindOfPublicationRepository;
import de.nordakademie.iaa.library.service.KindOfPublicationServiceInterface;
import de.nordakademie.iaa.library.service.mapper.KindOfPublicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * The kindOfPublication service provides methods to handle the kindOfPublication
 */
@Service
@Transactional
public class KindOfPublicationService implements KindOfPublicationServiceInterface {


    private final KindOfPublicationRepository kindOfPublicationRepository;

    private final KindOfPublicationMapper kindOfPublicationMapper;

    @Autowired
    public KindOfPublicationService(KindOfPublicationRepository kindOfPublicationRepository,
                                    KindOfPublicationMapper kindOfPublicationMapper) {
        this.kindOfPublicationRepository = kindOfPublicationRepository;
        this.kindOfPublicationMapper = kindOfPublicationMapper;
    }

    /**
     * get all kindOfPublications
     *
     * @return all kindOfPublications
     */
    public List<KindOfPublicationDto> getAll() {
        List<KindOfPublication> kindOfPublication = kindOfPublicationRepository.findAllByOrderByValue();
        return kindOfPublicationMapper.kindOfPublicationEntitiesToDtos(kindOfPublication);
    }

    /**
     * create a kindOfPublication
     *
     * @param kindOfPublicationDto the kindOfPublication that should be created
     * @return the created kindOfPublication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public KindOfPublicationDto create(@NotNull KindOfPublicationDto kindOfPublicationDto) {

        if (kindOfPublicationDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        return createOrUpdate(kindOfPublicationDto);
    }

    /**
     * update a kindOfPublication
     *
     * @param kindOfPublicationDto the kindOfPublication that should be updated
     * @return the updated kindOfPublication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public KindOfPublicationDto update(@NotNull KindOfPublicationDto kindOfPublicationDto) {

        if (kindOfPublicationDto.getUuid() == null
                || !kindOfPublicationRepository.existsById(kindOfPublicationDto.getUuid())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(kindOfPublicationDto);
    }


    /**
     * deletes the kindOfPublication
     *
     * @param uuid the kindOfPublication that should be deleted
     *             \@NotNull is here for documentation and does nothing.
     *             This method should not be called with null values.
     */
    public void delete(@NotNull UUID uuid) {
        Optional<KindOfPublication> kindOfPublicationOptional = kindOfPublicationRepository.findById(uuid);
        kindOfPublicationOptional.ifPresent(kindOfPublicationRepository::delete);
    }

    /**
     * create or update a kindOfPublication
     *
     * @param kindOfPublicationDto the kindOfPublication that should be created or updated
     * @return the created or updated kindOfPublication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private KindOfPublicationDto createOrUpdate(@NotNull KindOfPublicationDto kindOfPublicationDto) {
        if (!kindOfPublicationRepository.findByValue(kindOfPublicationDto.getValue()).isEmpty()) {
            throw new EntityAlreadyExistsException();
        }

        KindOfPublication kindOfPublication =
                kindOfPublicationMapper.kindOfPublicationDtoToEntity(kindOfPublicationDto);

        return kindOfPublicationMapper
                .kindOfPublicationEntityToDto(kindOfPublicationRepository.save(kindOfPublication));
    }
}
