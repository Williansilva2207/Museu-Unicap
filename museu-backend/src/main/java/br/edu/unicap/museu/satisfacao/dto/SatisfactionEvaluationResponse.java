package br.edu.unicap.museu.satisfacao.dto;

import java.time.OffsetDateTime;

public record SatisfactionEvaluationResponse(
        String protocol,
        OffsetDateTime evaluatedAt
) {
}