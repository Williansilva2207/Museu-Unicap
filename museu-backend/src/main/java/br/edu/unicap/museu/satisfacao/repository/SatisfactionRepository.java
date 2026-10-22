package br.edu.unicap.museu.satisfacao.repository;

import br.edu.unicap.museu.satisfacao.model.AvaliacaoSatisfacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SatisfactionRepository
        extends JpaRepository<AvaliacaoSatisfacao, Long> {

    Optional<AvaliacaoSatisfacao> findByProtocol(String protocol);

    boolean existsByProtocol(String protocol);
}