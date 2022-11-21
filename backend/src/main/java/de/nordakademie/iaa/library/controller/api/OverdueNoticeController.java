package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import de.nordakademie.iaa.library.service.impl.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.OVERDUE_NOTICE_BASE_PATH;

/**
 * Author: Nello Musmeci
 * controller OverdueNotice entity crud operations.
 */
@RestController
@RequestMapping(OVERDUE_NOTICE_BASE_PATH)
public class OverdueNoticeController {

    private final OverdueNoticeServiceInterface overdueNoticeService;

    private final AssignmentService assignmentService;

    @Autowired
    public OverdueNoticeController(OverdueNoticeServiceInterface overdueNoticeService,
                                   AssignmentService assignmentService) {
        this.overdueNoticeService = overdueNoticeService;
        this.assignmentService = assignmentService;
    }

    /**
     * This method will fetch all OverdueNotices.
     *
     * @return a list of OverdueNotices
     */
    @GetMapping
    public ResponseEntity<List<OverdueNoticeDto>> getAll(@RequestParam(defaultValue = "false") boolean showClosed) {
        return new ResponseEntity<>(overdueNoticeService.getAll(showClosed), HttpStatus.OK);
    }
}
