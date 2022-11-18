package de.nordakademie.iaa.library.service.helper;

public class InputValidator {
    // Checks if a string is empty, null or only contains whitespaces
    public static boolean isStringEmpty(String string) {
        return string == null || string.trim().isEmpty();
    }
}
