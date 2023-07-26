/* Get All */
function showAllPlayers() {
  var detailsDiv = document.getElementById("details");
  fetch("http://localhost:8080/api/player")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to fetch player details");
    })
    .then((players) => {
      var playersHtml = "<table><tr><th>ID</th><th>Name</th></tr><tbody>";

      players.forEach((player) => {
        playersHtml += "<tr><td>" + player.id + "</td><td>" + player.name + "</td></tr>";
      });

      playersHtml += "</tbody></table>";

      detailsDiv.innerHTML = "<h2>Show All Players</h2>" + playersHtml;
    })
    .catch((error) => {
      console.error("Error:", error);
      detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to fetch player details.</p>";
    });
}

// ===================================================================================================
/* Post new */
function addNewPlayer() {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Add New Player</h2><form id='addPlayerForm'>" +
    "<label for='name'>Name:</label> <input type='text' id='name' name='name' required><br><br>" +
    "<button type='submit'>Submit</button></form>";

  var addPlayerForm = document.getElementById("addPlayerForm");
  addPlayerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var nameInput = document.getElementById("name").value;

    var newPlayer = {
      name: nameInput,
    };

    fetch("http://localhost:8080/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlayer)
    })
      .then(response => {
        if (response.ok) {
          alert("Player added successfully!");
          addPlayerForm.reset(); // Reset the form to clear the input field
        } else if (response.status === 409) {
          throw new Error("Player with this name already exists"); // Player name conflict
        } else {
          throw new Error("Failed to save player. Please check the name field.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert(error.message); // Show an alert with the error message
      });
  });
}

//============================================================================
/* Put Player by id */
function showPlayerDetailsForm(player) {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Update Player Details</h2><form id='updateForm'>" +
    "<input type='hidden' id='playerId' name='playerId' value='" + player.id + "'>" +
    "<label for='name'>Name:</label> <input type='text' id='name' name='name' value='"
    + player.name + "' required><br><br>" +
    "<button type='submit'>Update</button></form>";

  var updateForm = document.getElementById("updateForm");
  updateForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var playerIdInput = document.getElementById("playerId");
    var nameInput = document.getElementById("name");

    var updatedPlayer = {
      id: playerIdInput.value,
      name: nameInput.value,
    };

    fetch("http://localhost:8080/api/player/" + playerIdInput.value, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPlayer)
    })
      .then(response => {
        if (response.ok) {
          alert("Player details updated successfully!");
          updatePlayerDetails();
        } else {
          throw new Error("Failed to update player details");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to update player details.</p>";
      });
  });
}


//=============================================================
//Delete Player by Id

// Delete a player by ID
function deletePlayerById() {
  var playerIdInput = document.getElementById("playerIdInput");
  var playerId = playerIdInput.value;

  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Deleting Player...</h2>";

  fetch("http://localhost:8080/api/player/" + playerId, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        alert("Player with ID " + playerId + " has been deleted.");
        playerIdInput.value = ""; // Clear the input textbox after successful deletion
        getPlayerIds(); // Re-fetch and re-populate the list after successful deletion
      } else {
        throw new Error("Failed to delete player");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to delete player.</p>";
    });
}