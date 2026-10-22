package br.edu.unicap.museu.satisfacao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.unicap.museu.satisfacao.dto.SatisfactionTopicResponse;

@RestController
@RequestMapping("/api/v1/topicos-satisfacao")
public class SatisfactionController {

    @GetMapping
    public List<SatisfactionTopicResponse> listarTopicos() {
        return List.of(
                new SatisfactionTopicResponse(
                        "acervo-historico",
                        "Acervo Histórico",
                        "history_edu"
                ),
                new SatisfactionTopicResponse(
                        "mediacao-monitores",
                        "Atendimento dos Monitores",
                        "support_agent"
                ),
                new SatisfactionTopicResponse(
                        "acessibilidade",
                        "Acessibilidade",
                        "accessible_forward"
                ),
                new SatisfactionTopicResponse(
                        "climatizacao",
                        "Climatização",
                        "ac_unit"
                ),
                new SatisfactionTopicResponse(
                        "iluminacao",
                        "Iluminação das Obras",
                        "wb_incandescent"
                ),
                new SatisfactionTopicResponse(
                        "arquitetura",
                        "Arquitetura do Prédio",
                        "architecture"
                ),
                new SatisfactionTopicResponse(
                        "curadoria-pedagogica",
                        "Curadoria Pedagógica",
                        "menu_book"
                ),
                new SatisfactionTopicResponse(
                        "sinalizacao-rotas",
                        "Sinalização das Rotas",
                        "signpost"
                )
        );
    }
}