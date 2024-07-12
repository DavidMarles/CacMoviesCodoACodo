package com.ar.movies;


public class RegistroPeliculas{
    private Long id;
    private String titulo;
    private String genero;
    private String duracion;
    private String imagen;
   
    public RegistroPeliculas() {
    
    }

    public RegistroPeliculas(Long id, String titulo, String genero, String duracion, String imagen) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.duracion = duracion;
        this.imagen = imagen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    @Override
    public String toString() {
        return "RegistroPeliculas [id=" + id + ", titulo=" + titulo + ", genero=" + genero + ", duracion=" + duracion
                + ", imagen=" + imagen + "]";
    }
    
    
    

    
    
}
