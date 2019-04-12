package br.pm.se.gov.observer.Util;

import br.pm.se.gov.observer.model.Servidor;

import java.io.*;
import java.util.ArrayList;

public class Util {

    public static boolean testaServico(Servidor s) {

        //exec();
        return false;
    }

    public static boolean ping(Servidor s) throws IOException {
        String comando = "ping -t 1 " + s.getEndereco();
        String retorno = exec(comando.toString());

        return retorno.contains("timeout") ? false : true;
    }

    public static String curl(Servidor s) throws IOException {
        String comando = "curl http://"+s.getEndereco()+":"+s.getPorta();
        String retorno = exec(comando);
        return retorno;
    }

    public static boolean servicoWeb(Servidor s) throws IOException {
        String curl = curl(s);
        return curl.contains("<!DOCTYPE html>");
    }

    private static String exec(String comando) throws IOException {
        ArrayList<String> commands = new ArrayList<String>();
        commands.add("/bin/bash");
        commands.add("-c");
        commands.add(comando);

        BufferedReader br = null;

        try {
            final ProcessBuilder p = new ProcessBuilder(commands);
            final Process process = p.start();
            final InputStream is = process.getInputStream();
            final InputStreamReader isr = new InputStreamReader(is);
            br = new BufferedReader(isr);

            Thread.sleep(100);
            String line;
            StringBuilder response = new StringBuilder();
            while((line = br.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } catch (IOException ioe) {
            //log.severe("Erro ao executar comando shell" + ioe.getMessage());
            throw ioe;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            secureClose(br);
        }
        return "";
    }

    private static void secureClose(final Closeable resource) {
        try {
            if (resource != null) {
                resource.close();
            }
        } catch (IOException ex) {
            //log.severe("Erro = " + ex.getMessage());
        }
    }
}
