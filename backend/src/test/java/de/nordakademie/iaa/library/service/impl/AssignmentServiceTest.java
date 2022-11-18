package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.*;
import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.AssignmentRepository;
import de.nordakademie.iaa.library.service.mapper.AssignmentMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssignmentServiceTest {

    @InjectMocks
    private AssignmentService assignmentService;

    @Mock
    private AssignmentRepository assignmentRepository;

    @Mock
    private PublicationService publicationService;

    @Mock
    private AssignmentMapper assignmentMapper;

    private AssignmentDto assignmentDto;
    private Assignment assignment;

    @BeforeEach
    void setUp() {
        this.assignmentDto = new AssignmentDto();
        this.assignment = new Assignment();
    }


    @Test
    void getAll_withShowReturnedTrue() {
        this.assignmentService.getAll(true);

        verify(assignmentRepository, times(0)).findAllUnreturned(any());
        verify(assignmentRepository, times(1)).findAll();
    }

    @Test
    void getAll_withShowReturnedFalse() {
        this.assignmentService.getAll(false);

        verify(assignmentRepository, times(1)).findAllUnreturned(any());
        verify(assignmentRepository, times(0)).findAll();
    }

    @Test
    void getAllByPublicationKey_withShowReturnedTrue() {
        this.assignmentService.getAllByPublicationKey("test",true);

        verify(assignmentRepository, times(0))
                .findAllUnreturnedByPublication_Key(any(),eq("test"));
        verify(assignmentRepository, times(1)).findAllByPublication_Key("test");
    }

    @Test
    void getAllByPublicationKey_withShowReturnedFalse() {
        this.assignmentService.getAllByPublicationKey("test",false);

        verify(assignmentRepository, times(1)).
                findAllUnreturnedByPublication_Key(any(),eq("test"));
        verify(assignmentRepository, times(0)).findAllByPublication_Key("test");
    }

    @Test
    void create_withoutPublication_ThrowsMissingFieldException() {
        assertThrows(MissingFieldException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void create_withoutPublicationKey_ThrowsMissingFieldException() {
        PublicationDto publicationDto = new PublicationDto();
        assignmentDto.setPublication(publicationDto);

        assertThrows(MissingFieldException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }


    @Test
    void create_withSetUuid_ThrowsIllegalUsageOfIdentifierException() {
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setPublication(publicationDto);
        assignmentDto.setUuid(UUID.randomUUID());

        assertThrows(IllegalUsageOfIdentifierException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void create_publicationDidNotExists_ThrowsPublicationIsNotBorrowableException() {
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setPublication(publicationDto);

        when(this.publicationService.getByKey("test")).thenThrow(new EntityDoesNotExistException());

        assertThrows(PublicationIsNotBorrowableException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void create_publicationQuantityIsSmallerThanAssignments_ThrowsPublicationIsNotBorrowableException() {
        Publication publication = new Publication();
        publication.setKey("test");

        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setPublication(publicationDto);

        when(this.publicationService.getByKey("test")).thenReturn(publication);
        when(this.assignmentService.getAllByPublicationKey("test", false))
                .thenReturn(new ArrayList<>());

        assertThrows(PublicationIsNotBorrowableException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void create_works() throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date dateOfAssignment = formatter.parse("2022-9-05 05:55:13");

        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setPublication(publicationDto);
        assignmentDto.setDateOfAssignment(dateOfAssignment);

        Date latestReturnDate = formatter.parse("2022-9-20 05:55:13");

        Publication publication = new Publication();
        publication.setKey("test");
        publication.setQuantity(1);

        assignment.setPublication(publication);
        assignment.setDateOfAssignment(dateOfAssignment);
        assignment.setLatestReturnDate(latestReturnDate);

        when(this.publicationService.getByKey("test")).thenReturn(publication);
        when(this.assignmentService.getAllByPublicationKey("test", false))
                .thenReturn(new ArrayList<>());
        when(this.assignmentMapper.assignmentDtoToEntity(assignmentDto)).thenReturn(assignment);
        when(this.assignmentRepository.save(assignment)).thenReturn(assignment);
        when(this.assignmentMapper.assignmentEntityToDto(assignment)).thenReturn(assignmentDto);

        assignmentDto.setLatestReturnDate(latestReturnDate);
        assertEquals(assignmentDto, this.assignmentService.create(assignmentDto));

        verify(this.assignmentRepository, times(1)).save(assignment);
    }

    @Test
    void update_withoutPublication_ThrowsMissingFieldException() {
        assertThrows(MissingFieldException.class, () -> this.assignmentService.create(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void update_withoutPublicationKey_ThrowsMissingFieldException() {
        PublicationDto publicationDto = new PublicationDto();
        assignmentDto.setPublication(publicationDto);

        assertThrows(MissingFieldException.class, () -> this.assignmentService.update(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }


    @Test
    void update_withoutUuid_EntityDoesNotExistException() {
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setPublication(publicationDto);

        assertThrows(EntityDoesNotExistException.class, () -> this.assignmentService.update(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }


    @Test
    void update_notExistingAssignment_throwsEntityDoesNotExistException() throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date dateOfAssignment = formatter.parse("2022-9-05 05:55:13");

        UUID uuid = UUID.randomUUID();
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setUuid(uuid);
        assignmentDto.setPublication(publicationDto);
        assignmentDto.setUuid(UUID.randomUUID());
        assignmentDto.setExtensions(1);

        Publication publication = new Publication();
        publication.setKey("test");

        assignment.setPublication(publication);
        assignment.setDateOfAssignment(dateOfAssignment);
        assignmentDto.setUuid(UUID.randomUUID());
        assignmentDto.setExtensions(1);

        when(assignmentMapper.assignmentDtoToEntity(assignmentDto)).thenReturn(assignment);
        when(assignmentRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(EntityDoesNotExistException.class, () -> this.assignmentService.update(assignmentDto));
        verify(this.assignmentRepository, times(0)).save(any());
    }

    @Test
    void update_works() throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date dateOfAssignment = formatter.parse("2022-9-05 05:55:13");
        Date latestReturnDate = formatter.parse("2022-9-20 05:55:13");

        UUID uuid = UUID.randomUUID();
        PublicationDto publicationDto = new PublicationDto();
        publicationDto.setKey("test");
        assignmentDto.setUuid(uuid);
        assignmentDto.setPublication(publicationDto);
        assignmentDto.setUuid(UUID.randomUUID());
        assignmentDto.setExtensions(1);

        Publication publication = new Publication();
        publication.setKey("test");

        assignment.setPublication(publication);
        assignment.setDateOfAssignment(dateOfAssignment);
        assignmentDto.setUuid(UUID.randomUUID());
        assignmentDto.setExtensions(1);

        when(assignmentMapper.assignmentDtoToEntity(assignmentDto)).thenReturn(assignment);

        assignment.setLatestReturnDate(latestReturnDate);
        assignment.setExtensions(3);
        when(assignmentRepository.findById(any())).thenReturn(Optional.of(assignment));
        when(assignmentRepository.save(assignment)).thenReturn(assignment);

        assignmentDto.setLatestReturnDate(latestReturnDate);
        assignmentDto.setExtensions(3);
        when(assignmentMapper.assignmentEntityToDto(assignment)).thenReturn(assignmentDto);

        assertEquals(assignmentDto, this.assignmentService.update(assignmentDto));
        verify(this.assignmentRepository, times(1)).save(any());
    }

    @Test
    void extend_withToMuchExtension_throwMaximumExtensionsException() throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date dateOfAssignment = formatter.parse("2022-9-05 05:55:13");
        Date latestReturnDate = formatter.parse("2022-9-20 05:55:13");

        UUID uuid = UUID.randomUUID();
        Publication publication = new Publication();
        publication.setKey("test");

        assignment.setUuid(uuid);
        assignment.setPublication(publication);
        assignment.setDateOfAssignment(dateOfAssignment);
        assignment.setLatestReturnDate(latestReturnDate);
        assignment.setExtensions(2);

        when(assignmentRepository.findById(any())).thenReturn(Optional.of(assignment));

        assertThrows(MaximumExtensionsException.class, () -> this.assignmentService.extend(uuid));
    }

    @Test
    void extend_works() throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date dateOfAssignment = formatter.parse("2022-9-05 05:55:13");
        Date latestReturnDate = formatter.parse("2022-9-20 05:55:13");
        Date latestReturnExtended = formatter.parse("2022-10-5 05:55:13");

        UUID uuid = UUID.randomUUID();
        Publication publication = new Publication();
        publication.setKey("test");

        assignment.setUuid(uuid);
        assignment.setPublication(publication);
        assignment.setDateOfAssignment(dateOfAssignment);
        assignment.setLatestReturnDate(latestReturnDate);
        assignment.setExtensions(1);

        when(assignmentRepository.findById(any())).thenReturn(Optional.of(assignment));

        this.assignmentService.extend(uuid);

        assignment.setLatestReturnDate(latestReturnExtended);
        assignment.setExtensions(2);
        verify(this.assignmentRepository,times(1)).save(assignment);
    }
}
