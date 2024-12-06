import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);

  /* Add Item */
  const addItem = (index: any) => {
    if (squares[index]) {
      return;
    }
    const newSquares = squares;
    newSquares[index] = isXNext ? "X" : "O";
    setSquares([...newSquares]);
    setIsXNext(!isXNext);
  };

  /* Calculate Winner */
  const calculateWinner = (squares: any) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  /* check if all squared is filled */
  const isAllFilled = () => {
    return squares.every((item) => item !== "");
  };

  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner) {
      Alert.alert("مبروك الفائز هو", `ا    ${winner}    ا`, [
        {
          text: "العب مرة أخرى",
          style: "default",
          onPress: (val) => {
            reset();
          },
        },
      ]);
    }

    if (!winner && isAllFilled()) {
      Alert.alert("انتهت اللعبة", "النتيجة تعادل", [
        {
          text: "العب مرة أخرى",
          style: "default",
          onPress: (val) => {
            reset();
          },
        },
      ]);
    }
  }, [squares]);

  /* reset game */
  const reset = () => {
    setSquares(Array(9).fill(""));
    setIsXNext(true);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.containerPage}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: 800,
            color: "#555555",
            fontStyle: "italic",
          }}
        >
          X-AND-O
        </Text>
        <View style={styles.allSquares}>
          {squares.map((square, index) => {
            return (
              <Pressable
                style={styles.square}
                onPress={() => addItem(index)}
                key={index}
              >
                <Text style={styles.squareLabel}>{square}</Text>
              </Pressable>
            );
          })}
        </View>

        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontFamily: "cursive",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            " {isXNext ? "X" : "O"} " الدور على
          </Text>
        </View>

        <View style={{ width: 100, alignSelf: "center", marginTop: 10 }}>
          <Button title="اعادة اللعبة" onPress={reset} color={"#557777"} />
        </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "red",
    height: 400,
    flexWrap: "wrap",
  },
  square: {
    width: "27%",
    height: 100,
    fontSize: 30,
    fontWeight: 800,
    backgroundColor: "#55aacc",
    color: "white",
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  squareLabel: {
    color: "#44ff00",
    fontWeight: 600,
    fontSize: 30,
  },
  reset: {
    backgroundColor: "red",
  },
});
