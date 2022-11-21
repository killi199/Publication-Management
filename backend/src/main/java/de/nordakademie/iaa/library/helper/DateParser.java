package de.nordakademie.iaa.library.helper;

import de.nordakademie.iaa.library.controller.api.exception.WrongDateFormatException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static de.nordakademie.iaa.library.service.helper.InputValidator.isStringEmpty;

/**
 * Functions that can parse dates
 */
public class DateParser {

    /**
     * This method will parse a dateString to a Date
     * @param dateString date string
     * @return parsed Date
     */
    public static Date parseDate(String dateString) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date date = null;
        if(!isStringEmpty(dateString)) {
            try {
                date = formatter.parse(dateString);
            } catch (ParseException e) {
                throw new WrongDateFormatException();
            }
        }

        return date;
    }
}
