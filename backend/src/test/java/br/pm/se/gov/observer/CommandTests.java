package br.pm.se.gov.observer;

import br.pm.se.gov.observer.Util.Util;
import br.pm.se.gov.observer.model.Servidor;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertTrue;

public class CommandTests {

    private Servidor servidor;

    @Before
    public void criaServidor() {
        servidor = new Servidor();
        servidor.setEndereco("172.23.7.48");
        servidor.setPorta("8080");
    }

    @Test
    public void pingTest() throws IOException {
        boolean response = Util.ping(servidor);
        assertTrue(!response);
    }

    @Test
    public void testaServidorWeb() throws IOException {
        boolean curl = Util.curl(servidor);
        assertTrue(curl);
    }
}
