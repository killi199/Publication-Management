package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.dto.KindOfPublicationDto;
import de.nordakademie.iaa.library.persistent.entities.KindOfPublication;
import de.nordakademie.iaa.library.persistent.repository.KindOfPublicationRepository;
import de.nordakademie.iaa.library.service.mapper.KindOfPublicationMapper;
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
class KindOfPublicationServiceTest {

    @InjectMocks
    private KindOfPublicationService kindOfPublicationService;

    @Mock
    private KindOfPublicationRepository kindOfPublicationRepository;

    @Mock
    private KindOfPublicationMapper kindOfPublicationMapper;

    private KindOfPublicationDto kindOfPublicationDto;
    private KindOfPublication kindOfPublication;

    @BeforeEach
    void setUp() {
        this.kindOfPublicationDto = new KindOfPublicationDto();
        this.kindOfPublication = new KindOfPublication();
    }

    @Test
    void create_withUUID_throwsIllegalUsageOfIdentifierException() {
        kindOfPublicationDto.setUuid(UUID.randomUUID());
        kindOfPublicationDto.setValue("test");

        assertThrows(IllegalUsageOfIdentifierException.class, () ->
                this.kindOfPublicationService.create(kindOfPublicationDto));
        verify(kindOfPublicationRepository, times(0)).existsById(any());
    }

    @Test
    void create_works() {
        kindOfPublicationDto.setValue("test");

        when(this.kindOfPublicationRepository.save(kindOfPublication)).thenReturn(kindOfPublication);
        when(this.kindOfPublicationMapper.kindOfPublicationDtoToEntity(kindOfPublicationDto))
                .thenReturn(kindOfPublication);
        when(this.kindOfPublicationMapper.kindOfPublicationEntityToDto(kindOfPublication))
                .thenReturn(kindOfPublicationDto);

        assertEquals(kindOfPublicationDto, this.kindOfPublicationService.create(kindOfPublicationDto));
        verify(kindOfPublicationRepository, times(1)).save(kindOfPublication);
        verify(kindOfPublicationMapper, times(1))
                .kindOfPublicationDtoToEntity(kindOfPublicationDto);
        verify(kindOfPublicationMapper, times(1))
                .kindOfPublicationEntityToDto(kindOfPublication);
    }

    @Test
    void update_keywordNotExists_throwsEntityDoesNotExistException() {
        UUID uuid = UUID.randomUUID();

        kindOfPublicationDto.setUuid(uuid);
        kindOfPublicationDto.setValue("test");

        when(this.kindOfPublicationRepository.existsById(uuid)).thenReturn(false);

        assertThrows(EntityDoesNotExistException.class, () -> this.kindOfPublicationService
                .update(kindOfPublicationDto));
        verify(kindOfPublicationRepository, times(1)).existsById(uuid);
    }

    @Test
    void update_works() {
        UUID uuid = UUID.randomUUID();

        kindOfPublicationDto.setUuid(uuid);
        kindOfPublicationDto.setValue("test");

        when(this.kindOfPublicationRepository.existsById(uuid)).thenReturn(true);
        when(this.kindOfPublicationRepository.save(kindOfPublication)).thenReturn(kindOfPublication);
        when(this.kindOfPublicationMapper.kindOfPublicationDtoToEntity(kindOfPublicationDto))
                .thenReturn(kindOfPublication);
        when(this.kindOfPublicationMapper.kindOfPublicationEntityToDto(kindOfPublication))
                .thenReturn(kindOfPublicationDto);

        assertEquals(kindOfPublicationDto, this.kindOfPublicationService.update(kindOfPublicationDto));
        verify(kindOfPublicationRepository, times(1)).existsById(uuid);
        verify(kindOfPublicationRepository, times(1)).save(kindOfPublication);
        verify(kindOfPublicationMapper, times(1))
                .kindOfPublicationDtoToEntity(kindOfPublicationDto);
        verify(kindOfPublicationMapper, times(1))
                .kindOfPublicationEntityToDto(kindOfPublication);
    }
}