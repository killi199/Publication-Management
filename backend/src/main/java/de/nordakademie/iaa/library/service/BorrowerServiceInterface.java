package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.BorrowerDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * The borrower service provides methods to handle the borrowers
 */
public interface BorrowerServiceInterface {

    /**
     * get all borrowers
     *
     * @return all borrowers
     */
    List<BorrowerDto> getAll();

    /**
     * create a borrower
     *
     * @param borrowerDto the borrower that should be created
     * @return the created borrower
     */
    BorrowerDto create(BorrowerDto borrowerDto);

    /**
     * update a borrower
     *
     * @param borrowerDto the borrower that should be updated
     * @return the updated borrower
     */
    BorrowerDto update(BorrowerDto borrowerDto);


    /**
     * deletes the borrower
     *
     * @param uuid the borrower that should be deleted
     */
    void delete(@NotNull UUID uuid);
}
