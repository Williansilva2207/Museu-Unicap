package br.edu.unicap.museu.satisfacao.service;

import org.springframework.stereotype.Service;

import br.edu.unicap.museu.satisfacao.dto.SatisfactionEvaluationRequest;
import br.edu.unicap.museu.satisfacao.dto.SatisfactionEvaluationResponse;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Service
public class SatisfactionService {

    private static final ZoneId FUSO_HORARIO =
            ZoneId.of("America/Recife");

    private final SecureRandom secureRandom = new SecureRandom();

    public SatisfactionEvaluationResponse registrarAvaliacao(
            SatisfactionEvaluationRequest request
    ) {
        String protocolo = gerarProtocolo();

        OffsetDateTime dataHoraRegistro =
                OffsetDateTime.now(FUSO_HORARIO);

        return new SatisfactionEvaluationResponse(
                protocolo,
                dataHoraRegistro
        );
    }

    private String gerarProtocolo() {
        int numeroAleatorio =
                secureRandom.nextInt(900000) + 100000;

        int anoAtual =
                OffsetDateTime.now(FUSO_HORARIO).getYear();

        return "SAT-" + anoAtual + "-" + numeroAleatorio;
    }
}