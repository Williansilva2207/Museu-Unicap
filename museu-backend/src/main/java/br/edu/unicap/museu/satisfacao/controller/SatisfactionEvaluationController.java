package br.edu.unicap.museu.satisfacao.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.unicap.museu.satisfacao.dto.SatisfactionEvaluationRequest;
import br.edu.unicap.museu.satisfacao.dto.SatisfactionEvaluationResponse;
import br.edu.unicap.museu.satisfacao.service.SatisfactionService;

@RestController
@RequestMapping("/api/v1/avaliacoes-satisfacao")
public class SatisfactionEvaluationController {

    private final SatisfactionService satisfactionService;

    public SatisfactionEvaluationController(
            SatisfactionService satisfactionService
    ) {
        this.satisfactionService = satisfactionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SatisfactionEvaluationResponse registrarAvaliacao(
            @Valid @RequestBody SatisfactionEvaluationRequest request
    ) {
        return satisfactionService.registrarAvaliacao(request);
    }
}