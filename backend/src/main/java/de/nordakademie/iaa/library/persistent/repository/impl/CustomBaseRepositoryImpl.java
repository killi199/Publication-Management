package de.nordakademie.iaa.library.persistent.repository.impl;

import de.nordakademie.iaa.library.persistent.repository.CustomBaseRepository;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;

public class CustomBaseRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements CustomBaseRepository<T, ID> {
    private final EntityManager entityManager;
    public CustomBaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public T saveAndRefresh(T t) {
        t = this.saveAndFlush(t);
        entityManager.refresh(t);
        return t;
    }
}
