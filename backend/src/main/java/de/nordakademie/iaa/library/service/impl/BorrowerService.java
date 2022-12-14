package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.dto.BorrowerDto;
import de.nordakademie.iaa.library.persistent.entities.Borrower;
import de.nordakademie.iaa.library.persistent.repository.BorrowerRepository;
import de.nordakademie.iaa.library.service.BorrowerServiceInterface;
import de.nordakademie.iaa.library.service.mapper.BorrowerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * The borrower service provides methods to handle the borrowers
 */
@Service
@Transactional
public class BorrowerService implements BorrowerServiceInterface {


    private final BorrowerRepository borrowerRepository;

    private final BorrowerMapper borrowerMapper;

    @Autowired
    public BorrowerService(BorrowerRepository borrowerRepository, BorrowerMapper borrowerMapper) {
        this.borrowerRepository = borrowerRepository;
        this.borrowerMapper = borrowerMapper;
    }

    /**
     * get all borrowers
     *
     * @return all borrowers
     */
    public List<BorrowerDto> getAll() {
        List<Borrower> borrowers = borrowerRepository.findAllByOrderByStudentNumber();
        return borrowerMapper.borrowerEntitiesToDtos(borrowers);
    }

    /**
     * create a borrower
     *
     * @param borrowerDto the borrower that should be created
     * @return the created borrower
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public BorrowerDto create(@NotNull BorrowerDto borrowerDto) {

        if (borrowerDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        return createOrUpdate(borrowerDto);
    }

    /**
     * update a borrower
     *
     * @param borrowerDto the borrower that should be updated
     * @return the updated borrower
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public BorrowerDto update(@NotNull BorrowerDto borrowerDto) {

        if (borrowerDto.getUuid() == null || !borrowerRepository.existsById(borrowerDto.getUuid())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(borrowerDto);
    }


    /**
     * deletes the borrower
     *
     * @param uuid the borrower that should be deleted
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public void delete(@NotNull UUID uuid) {
        Optional<Borrower> borrowerOptional = borrowerRepository.findById(uuid);
        borrowerOptional.ifPresent(borrowerRepository::delete);
    }

    /**
     * create or updates a borrower
     *
     * @param borrowerDto the borrower that should be created or updated
     * @return the created or updated borrower
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private BorrowerDto createOrUpdate(@NotNull BorrowerDto borrowerDto) {
        Borrower borrower = borrowerMapper.borrowerDtoToEntity(borrowerDto);

        return borrowerMapper.borrowerEntityToDto(borrowerRepository.save(borrower));
    }
}
