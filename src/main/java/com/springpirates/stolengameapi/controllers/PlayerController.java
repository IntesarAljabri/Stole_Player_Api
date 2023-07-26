package com.springpirates.stolengameapi.controllers;

import com.springpirates.stolengameapi.models.Player;
import com.springpirates.stolengameapi.repositories.PlayerRepository;
import com.springpirates.stolengameapi.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping(path = "/api/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @Autowired
    PlayerRepository playerRepository;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping(path = "{id}")
    public Player getSpecificPlayer(@PathVariable(name = "id") String id) {
        return playerRepository.findById(id).get();
    }

    @PostMapping
    public Player createPlayer(@RequestBody Player incomingPlayer) {
        playerRepository.save(incomingPlayer);
        return playerService.createPlayer(incomingPlayer);
    }

    @PutMapping(path = "{id}")
    public Player updatePlayer(@PathVariable(name = "id") String id, @RequestBody Player incomingUpdatedPlayer) {
       playerRepository.save(incomingUpdatedPlayer);
       return playerService.updatePlayer(id, incomingUpdatedPlayer);
    }

    @DeleteMapping(path = "{id}")
    public Player deletePlayer(@PathVariable(name = "id") String id) {
        Player exitingPlayer = getSpecificPlayer(id);
       playerRepository.delete(exitingPlayer);
       return exitingPlayer;
    }
}
