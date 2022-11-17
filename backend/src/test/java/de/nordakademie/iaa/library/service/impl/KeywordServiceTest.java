package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.KeywordDto;
import de.nordakademie.iaa.library.persistent.entities.Keyword;
import de.nordakademie.iaa.library.persistent.repository.KeywordRepository;
import de.nordakademie.iaa.library.service.mapper.KeywordMapper;
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
class KeywordServiceTest {

    @InjectMocks
    private KeywordService keywordService;

    @Mock
    private KeywordRepository keywordRepository;

    @Mock
    private KeywordMapper keywordMapper;

    private KeywordDto keywordDto;
    private Keyword keyword;

    @BeforeEach
    void setUp() {
        this.keywordDto = new KeywordDto();
        this.keyword = new Keyword();
    }


    @Test
    void create_withoutParameters_throwsMissingFieldException() {
        assertThrows(MissingFieldException.class, () -> this.keywordService.create(keywordDto));
        verify(keywordRepository, times(0)).existsById(any());
    }

    @Test
    void create_withUUID_throwsIllegalUsageOfIdentifierException() {
        keywordDto.setUuid(UUID.randomUUID());
        keywordDto.setValue("test");

        assertThrows(IllegalUsageOfIdentifierException.class, () -> this.keywordService.create(keywordDto));
        verify(keywordRepository, times(0)).existsById(any());
    }

    @Test
    void create_works() {

        keywordDto.setUuid(null);
        keywordDto.setValue("test");

        when(this.keywordRepository.save(keyword)).thenReturn(keyword);
        when(this.keywordMapper.keywordDtoToEntity(keywordDto)).thenReturn(keyword);
        when(this.keywordMapper.keywordEntityToDto(keyword)).thenReturn(keywordDto);

        assertEquals(keywordDto, this.keywordService.create(keywordDto));
        verify(keywordRepository, times(1)).save(keyword);
        verify(keywordMapper, times(1)).keywordDtoToEntity(keywordDto);
        verify(keywordMapper, times(1)).keywordEntityToDto(keyword);
    }

    @Test
    void update_nullKey_throwsMissingFieldException() {
        keywordDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.keywordService.update(keywordDto));
        verify(keywordRepository, times(0)).existsById(any());
    }

    @Test
    void update_nullTitle_throwsMissingFieldException() {
        UUID uuid = UUID.randomUUID();

        keywordDto.setUuid(uuid);

        assertThrows(MissingFieldException.class, () -> this.keywordService.update(keywordDto));
        verify(keywordRepository, times(0)).existsById(uuid);
    }


    @Test
    void update_keywordNotExists_throwsEntityDoesNotExistException() {
        UUID uuid = UUID.randomUUID();

        keywordDto.setUuid(uuid);
        keywordDto.setValue("test");

        when(this.keywordRepository.existsById(uuid)).thenReturn(false);

        assertThrows(EntityDoesNotExistException.class, () -> this.keywordService.update(keywordDto));
        verify(keywordRepository, times(1)).existsById(uuid);
    }

    @Test
    void update_works() {
        UUID uuid = UUID.randomUUID();

        keywordDto.setUuid(uuid);
        keywordDto.setValue("test");

        when(this.keywordRepository.existsById(uuid)).thenReturn(true);
        when(this.keywordRepository.save(keyword)).thenReturn(keyword);
        when(this.keywordMapper.keywordDtoToEntity(keywordDto)).thenReturn(keyword);
        when(this.keywordMapper.keywordEntityToDto(keyword)).thenReturn(keywordDto);

        assertEquals(keywordDto, this.keywordService.update(keywordDto));
        verify(keywordRepository, times(1)).existsById(uuid);
        verify(keywordRepository, times(1)).save(keyword);
        verify(keywordMapper, times(1)).keywordDtoToEntity(keywordDto);
        verify(keywordMapper, times(1)).keywordEntityToDto(keyword);
    }
}