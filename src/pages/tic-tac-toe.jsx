import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function TicTacToe() {
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  function handleTurns(position) {
    board[position] = player;
    setBoard([...board]);
    checkWinner();
    player === "O" ? setPlayer("X") : setPlayer("O");
  }

  function checkWinner() {
    const winPossibilites = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    if (
      winPossibilites.some(
        (p) => board[p[0]] === board[p[1]] && board[p[1]] === board[p[2]]
      )
    ) {
      setWinner(player);
    }
  }

  function reset() {
    setPlayer("O");
    setWinner("");
    setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.players}>
        <View
          style={[
            styles.o,
            { backgroundColor: player === "O" ? "#54a354" : "#aeaeae" },
          ]}
        >
          <Text style={styles.player}>O</Text>
        </View>
        <View style={styles.turn}>
          {!winner ? (
            <Feather
              name={player === "O" ? "arrow-left" : "arrow-right"}
              size={40}
            />
          ) : (
            <TouchableOpacity onPress={reset}>
              <Feather name="play-circle" size={40} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            styles.x,
            { backgroundColor: player === "X" ? "#54a354" : "#aeaeae" },
          ]}
        >
          <Text style={styles.player}>X</Text>
        </View>
      </View>
      <View style={styles.board}>
        {!winner ? (
          <FlatList
            data={board}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.piece}
                onPress={() => handleTurns(item)}
              >
                <Text>{["O", "X"].includes(item) ? item : ""}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
            numColumns={3}
          />
        ) : (
          <View>
            <Text style={{ fontSize: 30 }}> The Winner is "{winner}"</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  players: {
    height: 100,
    width: Dimensions.get("window").width,
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  o: {
    padding: 20,
    borderRadius: 10,
  },
  x: {
    padding: 20,
    borderRadius: 10,
  },
  player: {
    fontSize: 30,
  },
  board: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 50,
  },
  piece: {
    backgroundColor: "#0e0e0e0e",
    height: (Dimensions.get("window").width - 32) / 3,
    width: (Dimensions.get("window").width - 32) / 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 1,
  },
});
