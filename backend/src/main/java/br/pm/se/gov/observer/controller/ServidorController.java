package br.pm.se.gov.observer.controller;

import br.pm.se.gov.observer.Util.Util;
import br.pm.se.gov.observer.model.Servidor;
import br.pm.se.gov.observer.repository.ServidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ServidorController {
    @Autowired
    private ServidorRepository repo;

    @GetMapping("/api/servidores")
    public List<Servidor> getServidores() {
        return repo.findAll();
    }

    @PostMapping("/api/servidor")
    public Servidor salvarServidor(String alisas, String endereco, String porta) {
        Servidor server = new Servidor();
        server.setEndereco(endereco);
        server.setNome(alisas);
        server.setPorta(porta);
        repo.save(server);
        return  server;
    }

    @GetMapping("/api/servidor/{id}")
    public Servidor getServidor(@PathVariable Long id) {
        return repo.getOne(id);
    }

    @PutMapping("/api/servidor/{id}")
    public Servidor aleraServidor(@PathVariable Long id, String alias, String endereco, String porta) {
        Servidor servidor = repo.getOne(id);
        servidor.setNome(alias);
        servidor.setPorta(porta);
        servidor.setEndereco(endereco);
        repo.save(servidor);
        return servidor;
    }

    @GetMapping("/api/ping")
    public Servidor getPing( Long id ) throws IOException {
        Optional<Servidor> s = repo.findById(id);
        Servidor servidor =  s.get();
        boolean state = Util.ping(servidor);
        servidor.setEstado(state);
        repo.save(servidor);
        return servidor;
    }

    @GetMapping("/api/servicoWeb")
    public HashMap<String, String> getCurl(Long id ) throws IOException {
        Optional<Servidor> s = repo.findById(id);
        Servidor servidor =  s.get();
        boolean state = Util.servicoWeb(servidor);
        servidor.setEstado(state);
        repo.save(servidor);
        HashMap <String, String> result = new HashMap<String, String>();
        result.put("msg", (state) ? "Serviço ativo" : "Serviço inoperante");
        return  result;
    }
}
