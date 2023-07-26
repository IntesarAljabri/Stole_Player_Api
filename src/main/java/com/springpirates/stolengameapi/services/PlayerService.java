package com.springpirates.stolengameapi.services;

import com.springpirates.stolengameapi.models.Player;
import com.springpirates.stolengameapi.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getSpecificPlayer(String playerId) {
        Player foundPlayer = null;
        Optional<Player> optionalPlayer = playerRepository.findById(playerId);

        if(optionalPlayer.isPresent()) {
            foundPlayer = optionalPlayer.get();
        }
        return foundPlayer;
    }

    public Player createPlayer(@RequestBody Player incomingPlayer) {
        return playerRepository.save(incomingPlayer);
    }

    public Player updatePlayer(@PathVariable(name = "id") String playerId, @RequestBody Player incomingUpdatedPlayer) {
        Player existingPlayer = getSpecificPlayer(playerId);
        existingPlayer.name = incomingUpdatedPlayer.name;
        return playerRepository.save(existingPlayer);
    }

    public Player deletePlayer(@PathVariable(name = "id") String id) {
        Player existingPlayer = getSpecificPlayer(id);
        if(existingPlayer != null) {
            playerRepository.delete(existingPlayer);
        }
        return existingPlayer;
    }
}
