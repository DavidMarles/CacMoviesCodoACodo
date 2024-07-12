package com.ar.movies;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebFilter("/*")
public class CorsFilter implements Filter {



    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        
      HttpServletRequest httpRequest = (HttpServletRequest) req;
      HttpServletResponse httpResponse = (HttpServletResponse) resp;

      // Permitir acceso desde cualquier origen
      httpResponse.setHeader("Access-Control-Allow-Origin", "*");

      // Métodos permitidos
      httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

      // Cabeceras permitidas
      httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

      // Preflight (OPTIONS) cache timeout (10 minutes)
      httpResponse.setHeader("Access-Control-Max-Age", "600");

      // Si es una solicitud OPTIONS, simplemente termina la solicitud
      if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
         httpResponse.setStatus(HttpServletResponse.SC_OK);
         return;
      }

      // Continúa con el siguiente filtro en la cadena
      chain.doFilter(req, resp);
    }

}
