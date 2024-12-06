import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const addItem = (index: number) => {
    if (squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isAllFilled = () => squares.every((item) => item !== "");

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setModalTitle("مبروك الفائز هو");
      setModalMessage(winner);
      setModalVisible(true);
    } else if (isAllFilled()) {
      setModalTitle("انتهت اللعبة");
      setModalMessage("النتيجة تعادل");
      setModalVisible(true);
    }
  }, [squares]);

  const reset = () => {
    setSquares(Array(9).fill(""));
    setIsXNext(true);
    setModalVisible(false);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.containerPage}>
        <Text style={styles.title}>X-AND-O</Text>
        <View style={styles.allSquares}>
          {squares.map((square, index) => (
            <Pressable
              style={styles.square}
              onPress={() => addItem(index)}
              key={index}
            >
              <Text style={styles.squareLabel}>{square}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.turn}>
          " {isXNext ? "X" : "O"} " الدور على
        </Text>
        <View style={{ width: 100, alignSelf: "center", marginTop: 10 }}>
          <Button title="اعادة اللعبة" onPress={reset} color={"#557777"} />
        </View>

        {/* Custom Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <Pressable style={styles.modalButton} onPress={reset}>
                <Text style={styles.modalButtonText}>العب مرة أخرى</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    backgroundColor: "#ff5555",
  },
  allSquares: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    height: 400,
  },
  square: {
    width: "27%",
    height: 100,
    backgroundColor: "#55aacc",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  squareLabel: {
    color: "#44ff00",
    fontWeight: "600",
    fontSize: 30,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "800",
    color: "#555555",
    fontStyle: "italic",
  },
  turn: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "cursive",
    fontWeight: "600",
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#557777",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
