package br.pm.se.gov.observer.repository;

import br.pm.se.gov.observer.model.Servidor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServidorRepository extends JpaRepository<Servidor, Long> {

}
