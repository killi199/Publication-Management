package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.OVERDUE_NOTICE_BASE_PATH;

/**
 * controller OverdueNotice entity crud operations.
 */
@RestController
@RequestMapping(OVERDUE_NOTICE_BASE_PATH)
public class OverdueNoticeController {

    private final OverdueNoticeServiceInterface overdueNoticeService;

    @Autowired
    public OverdueNoticeController(OverdueNoticeServiceInterface overdueNoticeService) {
        this.overdueNoticeService = overdueNoticeService;
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

    /**
     * This method will delete a OverdueNotice. The key is necessary to find the OverdueNotice that should be deleted.
     *
     * @param uuid the OverdueNotice that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Null> delete(@PathVariable UUID uuid) {
        overdueNoticeService.delete(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
