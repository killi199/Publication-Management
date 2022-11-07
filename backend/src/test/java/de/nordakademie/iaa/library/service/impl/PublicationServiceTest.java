package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.api.exception.NegativValueIsNotAllowedException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.PublicationRepository;
import de.nordakademie.iaa.library.service.mapper.PublicationMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PublicationServiceTest {

    @InjectMocks
    private PublicationService publicationService;

    @Mock
    private PublicationRepository publicationRepository;

    @Mock
    private PublicationMapper publicationMapper;

    private PublicationDto publicationDto;
    private Publication publication;

    @BeforeEach
    void setUp() {
        this.publicationDto = new PublicationDto();
        this.publication = new Publication();
    }


    @Test
    void create_nullKey_throwsMissingFieldException() {
        publicationDto.setKey(null);

        assertThrows(MissingFieldException.class, () -> this.publicationService.create(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void create_nullTitle_throwsMissingFieldException() {
        publicationDto.setKey("test");

        assertThrows(MissingFieldException.class, () -> this.publicationService.create(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void create_negativeQuantity_throwsMissingFieldException() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");
        publicationDto.setQuantity(-1);

        assertThrows(NegativValueIsNotAllowedException.class, () -> this.publicationService.create(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void create_publicationExists_throwsEntityAlreadyExistsException() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");

        when(this.publicationRepository.existsById("test")).thenReturn(true);

        assertThrows(EntityAlreadyExistsException.class, () -> this.publicationService.create(publicationDto));
        verify(publicationRepository, times(1)).existsById("test");
    }

    @Test
    void create_works() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");

        when(this.publicationRepository.existsById("test")).thenReturn(false);
        when(this.publicationRepository.save(publication)).thenReturn(publication);
        when(this.publicationMapper.publicationDtoToEntity(publicationDto)).thenReturn(publication);
        when(this.publicationMapper.publicationEntityToDto(publication)).thenReturn(publicationDto);

        assertEquals(publicationDto, this.publicationService.create(publicationDto));
        verify(publicationRepository, times(1)).existsById("test");
        verify(publicationRepository, times(1)).save(publication);
        verify(publicationMapper, times(1)).publicationDtoToEntity(publicationDto);
        verify(publicationMapper, times(1)).publicationEntityToDto(publication);
    }

    @Test
    void update_nullKey_throwsMissingFieldException() {
        publicationDto.setKey(null);

        assertThrows(MissingFieldException.class, () -> this.publicationService.update(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void update_nullTitle_throwsMissingFieldException() {
        publicationDto.setKey("test");

        assertThrows(MissingFieldException.class, () -> this.publicationService.update(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void update_negativeQuantity_throwsMissingFieldException() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");
        publicationDto.setQuantity(-1);

        assertThrows(NegativValueIsNotAllowedException.class, () -> this.publicationService.update(publicationDto));
        verify(publicationRepository, times(0)).existsById("test");
    }

    @Test
    void update_publicationNotExists_throwsEntityDoesNotExistException() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");

        when(this.publicationRepository.existsById("test")).thenReturn(false);

        assertThrows(EntityDoesNotExistException.class, () -> this.publicationService.update(publicationDto));
        verify(publicationRepository, times(1)).existsById("test");
    }

    @Test
    void update_works() {
        publicationDto.setKey("test");
        publicationDto.setTitel("test");

        when(this.publicationRepository.existsById("test")).thenReturn(true);
        when(this.publicationRepository.save(publication)).thenReturn(publication);
        when(this.publicationMapper.publicationDtoToEntity(publicationDto)).thenReturn(publication);
        when(this.publicationMapper.publicationEntityToDto(publication)).thenReturn(publicationDto);

        assertEquals(publicationDto, this.publicationService.update(publicationDto));
        verify(publicationRepository, times(1)).existsById("test");
        verify(publicationRepository, times(1)).save(publication);
        verify(publicationMapper, times(1)).publicationDtoToEntity(publicationDto);
        verify(publicationMapper, times(1)).publicationEntityToDto(publication);
    }
}