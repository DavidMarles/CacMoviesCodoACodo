package com.ar.movies;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class MovieDAO {

    public Long insertarPelicula(RegistroPeliculas pelicula){

        String insertPeliculasSql = "INSERT INTO registropeliculas (titulo, genero, duracion, imagen) VALUES (?,?,?,?)";

        DbConnection conexion = new DbConnection();

        Statement stm = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;

        Connection cn = conexion.conectar();

        try {
            pstm = cn.prepareStatement(insertPeliculasSql);
   
            pstm.setString(1, pelicula.getTitulo());
            pstm.setString(2, pelicula.getGenero());
            pstm.setString(3, pelicula.getDuracion());
            pstm.setString(4, pelicula.getImagen());
   
            int result = pstm.executeUpdate();
   
            if (result > 0) {
   
               rs = pstm.getGeneratedKeys();
   
               if(rs.next()) {
                  System.out.println("Pelicula fue insertada correctamente");
                  return rs.getLong(1);
               }
               else {
                  System.out.println("Error al obtener el ID de la pelicula insertada");
                  return null;
               }
            }
            
         } catch (SQLException e) {
            e.printStackTrace();
            return null;
         }
         return null;
      }

      public List<RegistroPeliculas> getAllRegistroPeliculas() {

        String selectAllPeliculasSql = "SELECT * FROM RegistroPeliculas";
  
        DbConnection conexion = new DbConnection();
  
        List<RegistroPeliculas> peliculas = new ArrayList<>();
          
          Statement stm = null;
          PreparedStatement pstm = null;
          ResultSet rs = null;
  
        Connection cn = conexion.conectar();
  
        try {
           
           //pstm = cn.prepareStatement(selectAllPeliculasSql);
           stm = cn.createStatement();
  
           rs = stm.executeQuery(selectAllPeliculasSql);
  
           //rs = pstm.executeQuery();
  
           while (rs.next()) {
  
              Long idPelicula = rs.getLong("id");
              String titulo = rs.getString("titulo");
              String genero = rs.getString("genero");
              String duracion = rs.getString("duracion");
              String imagen = rs.getString("imagen");
              
              RegistroPeliculas pelicula = new RegistroPeliculas(idPelicula,titulo,genero,duracion,imagen);
  
              peliculas.add(pelicula);
  
           }
  
        } catch (Exception e) {
           e.printStackTrace();
           return null;
        }
  
        return peliculas;
     }

}
