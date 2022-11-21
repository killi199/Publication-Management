package de.nordakademie.iaa.library.helper;

/**
 * Author: Nello Musmeci
 * Functions that trim strings
 */
public class StringTrimmer {

    private StringTrimmer() {
    }

    /**
     * This method will trim a string if it is not null
     * @param string string to trim
     * @return trimmed string
     */
    public static String trimIfNotNull(String string) {
        return string == null ? null : string.trim();
    }
}
