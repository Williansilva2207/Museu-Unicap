package br.edu.unicap.museu.satisfacao.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "avaliacoes_satisfacao")
public class AvaliacaoSatisfacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String protocol;

    @Column(nullable = false)
    private Integer rating;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "avaliacao_satisfacao_topicos",
            joinColumns = @JoinColumn(name = "avaliacao_id")
    )
    @Column(name = "topico_id")
    private List<String> topicIds = new ArrayList<>();

    @Column(nullable = false)
    private String terminalId;

    @Column(nullable = false)
    private OffsetDateTime evaluatedAt;

    public AvaliacaoSatisfacao() {
    }

    public AvaliacaoSatisfacao(
            String protocol,
            Integer rating,
            List<String> topicIds,
            String terminalId,
            OffsetDateTime evaluatedAt
    ) {
        this.protocol = protocol;
        this.rating = rating;
        this.topicIds = new ArrayList<>(topicIds);
        this.terminalId = terminalId;
        this.evaluatedAt = evaluatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getProtocol() {
        return protocol;
    }

    public Integer getRating() {
        return rating;
    }

    public List<String> getTopicIds() {
        return topicIds;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public OffsetDateTime getEvaluatedAt() {
        return evaluatedAt;
    }
}