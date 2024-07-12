package com.ar.movies;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {

    private static final String CONTROLADOR = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://localhost:3306/peliculas";
    private static final String USER = "root";
    private static final String CONTRASENNA = "";

    static{
        try{
            Class.forName(CONTROLADOR);
            System.out.println("Driver OK");
        }
        catch (ClassNotFoundException error) {
            System.out.println("Error al cargar el driver");
            error.printStackTrace();
        }
    }

    public Connection conectar(){
        Connection conexion = null;

        try{
            conexion = DriverManager.getConnection(URL, USER, CONTRASENNA);
            System.out.println("Conectado");
        }
        catch (SQLException e){
            System.out.println("Error al conectar");
            e.printStackTrace();
        }

        return conexion;
    }
    
}
