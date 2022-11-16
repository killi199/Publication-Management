package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.AuthorDto;
import de.nordakademie.iaa.library.persistent.entities.Author;
import de.nordakademie.iaa.library.persistent.repository.AuthorRepository;
import de.nordakademie.iaa.library.service.mapper.AuthorMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class AuthorServiceTest {

    @InjectMocks
    private AuthorService authorService;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private AuthorMapper authorMapper;

    private AuthorDto authorDto;
    private Author author;

    @BeforeEach
    void setUp() {
        this.authorDto = new AuthorDto();
        this.author = new Author();
    }


    @Test
    void create_nullUUID_throwsMissingFieldException() {
        authorDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.authorService.create(authorDto));
        verify(authorRepository, times(0)).existsById(any());
    }

    @Test
    void create_nullValue_throwsMissingFieldException() {
        authorDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.authorService.create(authorDto));
        verify(authorRepository, times(0)).existsById(any());
    }

    @Test
    void create_works() {

        authorDto.setUuid(null);
        authorDto.setName("Max");
        authorDto.setSurname("Mustermann");

        when(this.authorRepository.save(author)).thenReturn(author);
        when(this.authorMapper.authorDtoToEntity(authorDto)).thenReturn(author);
        when(this.authorMapper.authorEntityToDto(author)).thenReturn(authorDto);

        assertEquals(authorDto, this.authorService.create(authorDto));
        verify(authorRepository, times(1)).save(author);
        verify(authorMapper, times(1)).authorDtoToEntity(authorDto);
        verify(authorMapper, times(1)).authorEntityToDto(author);
    }

    @Test
    void update_nullKey_throwsMissingFieldException() {
        authorDto.setUuid(null);

        assertThrows(MissingFieldException.class, () -> this.authorService.update(authorDto));
        verify(authorRepository, times(0)).existsById(any());
    }

    @Test
    void update_nullTitle_throwsMissingFieldException() {
        UUID uuid = UUID.randomUUID();

        authorDto.setUuid(uuid);

        assertThrows(MissingFieldException.class, () -> this.authorService.update(authorDto));
        verify(authorRepository, times(0)).existsById(uuid);
    }


    @Test
    void update_authorNotExists_throwsEntityDoesNotExistException() {
        UUID uuid = UUID.randomUUID();

        authorDto.setUuid(uuid);
        authorDto.setName("Max");
        authorDto.setSurname("Mustermann");

        when(this.authorRepository.existsById(uuid)).thenReturn(false);

        assertThrows(EntityDoesNotExistException.class, () -> this.authorService.update(authorDto));
        verify(authorRepository, times(1)).existsById(uuid);
    }

    @Test
    void update_works() {
        UUID uuid = UUID.randomUUID();

        authorDto.setUuid(uuid);
        authorDto.setName("Max");
        authorDto.setSurname("Mustermann");

        when(this.authorRepository.existsById(uuid)).thenReturn(true);
        when(this.authorRepository.save(author)).thenReturn(author);
        when(this.authorMapper.authorDtoToEntity(authorDto)).thenReturn(author);
        when(this.authorMapper.authorEntityToDto(author)).thenReturn(authorDto);

        assertEquals(authorDto, this.authorService.update(authorDto));
        verify(authorRepository, times(1)).existsById(uuid);
        verify(authorRepository, times(1)).save(author);
        verify(authorMapper, times(1)).authorDtoToEntity(authorDto);
        verify(authorMapper, times(1)).authorEntityToDto(author);
    }
}
