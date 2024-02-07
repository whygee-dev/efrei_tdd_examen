import { describe, expect, it, vi } from "vitest";
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

  describe("set board", () => {
    it("should throw an error if the board is y size is not 8", () => {
      // Arrange
      const game = new ChessGame();

      // Act && Assert
      expect(() => {
        game.board = [
          ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
          ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          ["♙", " ", " ", " ", " ", " ", " ", " "],
          [" ", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ];
      }).toThrowError("Invalid board size");
    });

    it("should throw an error if the board is x size is not 8", () => {
      // Arrange
      const game = new ChessGame();

      // Act && Assert
      expect(() => {
        game.board = [
          ["♜", "♞", "♝", "♛", "♚", "♝", "♞"],
          ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          ["♙", " ", " ", " ", " ", " ", " ", " "],
          [" ", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
          ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
        ];
      }).toThrowError("Invalid board size");
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

    it("should move a piece from a7 to a3", () => {
      // Arrange
      const game = new ChessGame();
      const expectedBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        [" ", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["♟", " ", " ", " ", " ", " ", " ", " "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ];

      // Act
      game.movePiece("a7", "a3");

      // Assert
      expect(game.board).toEqual(expectedBoard);
    });
  });

  describe("castling", () => {
    it("should correctly castle if conditions are met", () => {
      // Arrange
      const game = new ChessGame();
      game.board = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", " ", "♟", " ", "♟", "♟", "♟"],
        [" ", " ", "♟", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", "♙", " ", "♟", " ", "♙", " "],
        ["♙", "♙", " ", " ", " ", "♙", "♘", " "],
        [" ", " ", " ", "♙", "♙", "♗", " ", "♙"],
        ["♖", "♘", "♗", "♕", "♔", " ", " ", "♖"],
      ];

      const expectedBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", " ", "♟", " ", "♟", "♟", "♟"],
        [" ", " ", "♟", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", "♙", " ", "♟", " ", "♙", " "],
        ["♙", "♙", " ", " ", " ", "♙", "♘", " "],
        [" ", " ", " ", "♙", "♙", "♗", " ", "♙"],
        ["♖", "♘", "♗", "♕", " ", "♖", "♔", " "],
      ];

      // Act
      game.castling();

      // Assert
      expect(game.board).toEqual(expectedBoard);
    });
  });
});
