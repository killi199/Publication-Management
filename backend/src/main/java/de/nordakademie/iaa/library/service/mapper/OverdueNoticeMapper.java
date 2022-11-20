package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.persistent.entities.OverdueNotice;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * This is an interface for a generated mapper.
 * This interface defines methods to map between OverdueNotices and OverdueNotice.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface OverdueNoticeMapper {

    OverdueNoticeDto overdueNoticeEntityToDto(OverdueNotice overdueNoticeDto);

    OverdueNotice overdueNoticeDtoToEntity(OverdueNoticeDto overdueNoticeDto);

    List<OverdueNoticeDto> overdueNoticeEntitiesToDtos(List<OverdueNotice> overdueNoticeDto);
}
