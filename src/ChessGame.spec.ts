import { describe, expect, it } from "vitest";
import { ChessGame } from "./ChessGame";

describe("ChessGame", () => {
  describe("constructBoard", () => {
    it("should print the initial board", () => {
      // Arrange
      const game = new ChessGame();
      const expectedBoard = `8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
6                
5                
4                
3                
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h`;

      // Act
      const board = game.constructBoard();

      // Assert
      expect(board).toBe(expectedBoard);
    });
  });

  describe("movePiece", () => {
    it("should move a piece from a2 to a3", () => {
      // Arrange
      const game = new ChessGame();
      const expectedBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["♙", " ", " ", " ", " ", " ", " ", " "],
        [" ", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ];

      // Act
      game.movePiece("a2", "a3");

      // Assert
      expect(game.board).toEqual(expectedBoard);
    });
  });
});
