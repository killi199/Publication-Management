package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.BorrowerDto;
import de.nordakademie.iaa.library.persistent.entities.Borrower;
import de.nordakademie.iaa.library.persistent.repository.BorrowerRepository;
import de.nordakademie.iaa.library.service.mapper.BorrowerMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BorrowerServiceTest {

    @InjectMocks
    private BorrowerService borrowerService;

    @Mock
    private BorrowerRepository borrowerRepository;

    @Mock
    private BorrowerMapper borrowerMapper;

    private BorrowerDto borrowerDto;
    private Borrower borrower;

    @BeforeEach
    void setUp() {
        this.borrowerDto = new BorrowerDto();
        this.borrower = new Borrower();
    }


    @Test
    void create_nullUUID_throwsMissingFieldException() {
        borrowerDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.borrowerService.create(borrowerDto));
        verify(borrowerRepository, times(0)).existsById(any());
    }

    @Test
    void create_nullValue_throwsMissingFieldException() {
        borrowerDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.borrowerService.create(borrowerDto));
        verify(borrowerRepository, times(0)).existsById(any());
    }

    @Test
    void create_works() {

        borrowerDto.setUuid(null);
        borrowerDto.setStudentNumber("test");

        when(this.borrowerRepository.save(borrower)).thenReturn(borrower);
        when(this.borrowerMapper.borrowerDtoToEntity(borrowerDto)).thenReturn(borrower);
        when(this.borrowerMapper.borrowerEntityToDto(borrower)).thenReturn(borrowerDto);

        assertEquals(borrowerDto, this.borrowerService.create(borrowerDto));
        verify(borrowerRepository, times(1)).save(borrower);
        verify(borrowerMapper, times(1)).borrowerDtoToEntity(borrowerDto);
        verify(borrowerMapper, times(1)).borrowerEntityToDto(borrower);
    }

    @Test
    void update_nullKey_throwsMissingFieldException() {
        borrowerDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.borrowerService.update(borrowerDto));
        verify(borrowerRepository, times(0)).existsById(any());
    }

    @Test
    void update_nullTitle_throwsMissingFieldException() {
        UUID uuid = UUID.randomUUID();

        borrowerDto.setUuid(uuid);

        assertThrows(MissingFieldException.class, () -> this.borrowerService.update(borrowerDto));
        verify(borrowerRepository, times(0)).existsById(uuid);
    }


    @Test
    void update_borrowerNotExists_throwsEntityDoesNotExistException() {
        UUID uuid = UUID.randomUUID();

        borrowerDto.setUuid(uuid);
        borrowerDto.setStudentNumber("test");

        when(this.borrowerRepository.existsById(uuid)).thenReturn(false);

        assertThrows(EntityDoesNotExistException.class, () -> this.borrowerService.update(borrowerDto));
        verify(borrowerRepository, times(1)).existsById(uuid);
    }

    @Test
    void update_works() {
        UUID uuid = UUID.randomUUID();

        borrowerDto.setUuid(uuid);
        borrowerDto.setStudentNumber("test");

        when(this.borrowerRepository.existsById(uuid)).thenReturn(true);
        when(this.borrowerRepository.save(borrower)).thenReturn(borrower);
        when(this.borrowerMapper.borrowerDtoToEntity(borrowerDto)).thenReturn(borrower);
        when(this.borrowerMapper.borrowerEntityToDto(borrower)).thenReturn(borrowerDto);

        assertEquals(borrowerDto, this.borrowerService.update(borrowerDto));
        verify(borrowerRepository, times(1)).existsById(uuid);
        verify(borrowerRepository, times(1)).save(borrower);
        verify(borrowerMapper, times(1)).borrowerDtoToEntity(borrowerDto);
        verify(borrowerMapper, times(1)).borrowerEntityToDto(borrower);
    }
}