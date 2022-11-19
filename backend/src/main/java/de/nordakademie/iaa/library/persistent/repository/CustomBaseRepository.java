package de.nordakademie.iaa.library.persistent.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface CustomBaseRepository<T,ID extends Serializable> extends CrudRepository<T,ID> {

    T saveAndRefresh(T t);

}
