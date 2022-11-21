package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.BorrowerDto;
import de.nordakademie.iaa.library.persistent.entities.Borrower;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Author: Nello Musmeci
 * This is an interface for a generated mapper.
 * This interface defines methods to map between borrowerDtos and borrowers.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface BorrowerMapper {

    BorrowerDto borrowerEntityToDto(Borrower borrower);

    Borrower borrowerDtoToEntity(BorrowerDto borrowerDto);

    List<BorrowerDto> borrowerEntitiesToDtos(List<Borrower> borrowerDto);
}