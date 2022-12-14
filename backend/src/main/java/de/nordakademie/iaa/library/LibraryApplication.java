package de.nordakademie.iaa.library;

import de.nordakademie.iaa.library.persistent.repository.impl.CustomBaseRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@PropertySource("classpath:configuration.properties")
@EnableJpaRepositories(repositoryBaseClass = CustomBaseRepositoryImpl.class)
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

}
