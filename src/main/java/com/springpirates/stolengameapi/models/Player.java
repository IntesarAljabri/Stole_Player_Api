package com.springpirates.stolengameapi.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Player")
public class Player {
    @Id
    public String id;
    public String name;
}
