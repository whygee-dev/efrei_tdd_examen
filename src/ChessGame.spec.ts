import { describe, expect, it, beforeEach, vi } from "vitest";
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

  describe("canMovePiece", () => {
    it("should return true if a piece can move to a new position", () => {
      const game = new ChessGame();
      const initialPosition = { row: 6, column: 4 };
      const newPosition = { row: 5, column: 4 };

      const canMove = game.canMovePiece(initialPosition, newPosition);

      expect(canMove).toBe(true);
    });

    it("should return false if the new position is out of bounds", () => {
      const game = new ChessGame();
      const initialPosition = { row: 6, column: 4 };
      const newPosition = { row: -1, column: 4 };

      const canMove = game.canMovePiece(initialPosition, newPosition);

      expect(canMove).toBe(false);
    });

    it("should return false if there is no piece at the initial position", () => {
      const game = new ChessGame();
      const initialPosition = { row: 4, column: 4 };
      const newPosition = { row: 3, column: 4 };

      const canMove = game.canMovePiece(initialPosition, newPosition);

      expect(canMove).toBe(false);
    });

    // Add more test cases for different scenarios
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

  describe("killPiece()", () => {
    it("should remove a piece from the board", () => {
      // Arrange
      const game = new ChessGame();
      const initialBoard = [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "♜", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ];

      game["_board"] = initialBoard; // Accès direct à la propriété privée

      const positionToKill = { row: 3, column: 3 };

      // Act
      game.killPiece(positionToKill);

      // Assert
      expect(game["_board"][positionToKill.row][positionToKill.column]).toBe(" "); // Check if piece is removed from the board
    });

    it("should throw an error if trying to kill a piece at an invalid position", () => {
      // Arrange
      const game = new ChessGame();
      const initialBoard = [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "♜", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ];

      game["_board"] = initialBoard; // Accès direct à la propriété privée

      const invalidPosition = { row: 10, column: 10 };

      // Act & Assert
      expect(() => {
        game.killPiece(invalidPosition);
      }).toThrowError("Invalid position");
    });
  });
});
