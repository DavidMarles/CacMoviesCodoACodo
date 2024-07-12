package com.ar.movies;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

//Responder a la solicitud HTTP de la URL /peliculas
@WebServlet("/RegistroPeliculas")

public class MovieServlet extends HttpServlet{

   //Generamos la instancia de las operaciones de la base de datos
   private MovieDAO MovieDAO = new MovieDAO();

   //Generar una instancia de un objeto que utiliza libreria JACKSON para conventir un objeto en json y viceversa
   private ObjectMapper objectMapper = new ObjectMapper();

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      
      // Configurar cabeceras CORS
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.setHeader("Access-Control-Allow-Methods", "*");
      resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

      // Establecer la codificación de caracteres
      req.setCharacterEncoding("UTF-8");
      resp.setCharacterEncoding("UTF-8");

      // Leer JSON del cuerpo de la solicitud y convertirlo en un objeto Pelicula
      RegistroPeliculas pelicula = objectMapper.readValue(req.getInputStream(), RegistroPeliculas.class);

      // Insertar la película en la base de datos
      Long id = MovieDAO.insertarPelicula(pelicula);

      // Convertir el id a JSON
      String jsonResponse = objectMapper.writeValueAsString(id);

      // Establecer el tipo de contenido de la respuesta a JSON
      resp.setContentType("application/json");

      // Escribir la respuesta JSON
      resp.getWriter().write(jsonResponse);

      // Establecer el estado de la respuesta a 201 (Creado)
      resp.setStatus(HttpServletResponse.SC_CREATED);

      // No es necesario llamar a super.doPost(req, resp); al final, ya que podría causar una excepción "Servlet has already been committed".
      // super.doPost(req, resp);
   }

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      
      // Configurar cabeceras CORS
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.setHeader("Access-Control-Allow-Methods", "*");
      resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

      // Establecer la codificación de caracteres
      req.setCharacterEncoding("UTF-8");
      resp.setCharacterEncoding("UTF-8");

      try {
         //Obtener las peliculas
         List<RegistroPeliculas> peliculas = MovieDAO.getAllRegistroPeliculas();
         String jsonResponse = objectMapper.writeValueAsString(peliculas);
         // Establecer el tipo de contenido de la respuesta a JSON
         resp.setContentType("application/json");
         resp.getWriter().write(jsonResponse);

      } catch (NumberFormatException e) {
         e.printStackTrace();
         resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID inválido");
      }
   }

   
}





