package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Ioption;

@Repository
public interface OptionRepository extends JpaRepository<Ioption, Long> {

}
