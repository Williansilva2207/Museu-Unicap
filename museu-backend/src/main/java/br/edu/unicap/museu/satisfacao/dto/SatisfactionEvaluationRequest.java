package br.edu.unicap.museu.satisfacao.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SatisfactionEvaluationRequest(

        @NotNull(message = "A nota de satisfação é obrigatória.")
        @Min(value = 1, message = "A nota deve ser no mínimo 1.")
        @Max(value = 5, message = "A nota deve ser no máximo 5.")
        Integer rating,

        @NotNull(message = "A lista de tópicos é obrigatória.")
        List<String> topicIds,

        @NotBlank(message = "O identificador do terminal é obrigatório.")
        String terminalId
) {
}