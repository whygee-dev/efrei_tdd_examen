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

  describe("canMovePiece", () => {
    it("should return true if a piece can move to a new position", () => {
      // Arrange
      const game = new ChessGame();
      const initialSquare = "e2"; 
      const newSquare = "e4"; 

      // Act
      const canMove = game.canMovePiece(initialSquare, newSquare);

      // Assert
      expect(canMove).toBe(true);
    });

    it("should return false if the new position is out of bounds", () => {
      // Arrange
      const game = new ChessGame();
      const initialSquare = "e2";
      const newSquare = "e9";

      // Act
      const canMove = game.canMovePiece(initialSquare, newSquare);

      // Assert
      expect(canMove).toBe(false);
    });

    it("should return false if there is no piece at the initial position", () => {
      // Arrange
      const game = new ChessGame();
      const initialSquare = "e3";
      const newSquare = "e4";

      // Act
      const canMove = game.canMovePiece(initialSquare, newSquare);

      // Assert
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
    it("should correctly castle king side if conditions are met", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("g2", "g3");
      game.movePiece("g1", "g4");
      game.movePiece("f2", "f3");
      game.movePiece("f1", "f2");

      const expectedBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", "♘", " "],
        [" ", " ", " ", " ", " ", "♙", "♙", " "],
        ["♙", "♙", "♙", "♙", "♙", "♗", " ", "♙"],
        ["♖", "♘", "♗", "♕", " ", "♖", "♔", " "],
      ];

      // Act
      game.castling("white", "king");

      // Assert
      expect(game.board).toEqual(expectedBoard);
    });

    it("should correctly castle queen side if conditions are met", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("b2", "b3");
      game.movePiece("b1", "b4");
      game.movePiece("c2", "c3");
      game.movePiece("c1", "c2");
      game.movePiece("d2", "d3");
      game.movePiece("d1", "d2");

      const expectedBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "♘", " ", " ", " ", " ", " ", " "],
        [" ", "♙", "♙", "♙", " ", " ", " ", " "],
        ["♙", " ", "♗", "♕", "♙", "♙", "♙", "♙"],
        [" ", " ", "♔", "♖", " ", "♗", "♘", "♖"],
      ];

      // Act
      game.castling("white", "queen");

      // Assert
      expect(game.board).toEqual(expectedBoard);
    });

    it("should throw an error while castling(white, king) if king has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("e1", "d1");
      game.movePiece("h1", "g1");

      // Act & Assert
      expect(() => {
        game.castling("white", "king");
      }).toThrowError("White king has already moved");
    });

    it("should throw an error while castling(white, king) if rook king side has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("h1", "g1");
      game.movePiece("a1", "b1");

      // Act & Assert
      expect(() => {
        game.castling("white", "king");
      }).toThrowError("White king side rook has already moved");
    });

    it("should throw an error while castling(white, queen) if rook queen side has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("h1", "g1");
      game.movePiece("a1", "b1");

      // Act & Assert
      expect(() => {
        game.castling("white", "queen");
      }).toThrowError("White queen side rook has already moved");
    });

    it("should throw an error while castling(black, king) if king has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("e8", "d8");
      game.movePiece("h8", "g8");

      // Act & Assert
      expect(() => {
        game.castling("black", "king");
      }).toThrowError("Black king has already moved");
    });

    it("should throw an error while castling(black, king) if rook king side has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("h8", "g8");
      game.movePiece("a8", "b8");

      // Act & Assert
      expect(() => {
        game.castling("black", "king");
      }).toThrowError("Black king side rook has already moved");
    });

    it("should throw an error while castling(white, queen) if rook queen side has already moved", () => {
      // Arrange
      const game = new ChessGame();
      game.movePiece("h8", "g8");
      game.movePiece("a8", "b8");

      // Act & Assert
      expect(() => {
        game.castling("black", "queen");
      }).toThrowError("Black queen side rook has already moved");
    });
  });

  describe("killPiece()", () => {
    it("should remove a piece from the board at the specified position", () => {
      // Arrange
      const game = new ChessGame();
      const initialBoard = [
        ["♜", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ];
  
      game["_board"] = initialBoard;
  
      const squareToKill = "b1";
  
      // Act
      game.killPiece(squareToKill);
  
      // Assert
      expect(game["_board"][1][1]).toBe(" ");
    });
    
    it("should throw an error if trying to kill a piece at an invalid position", () => {
      // Arrange
      const game = new ChessGame();
      const invalidSquare = "k10";
    
      // Act & Assert
      expect(() => {
        game.killPiece(invalidSquare);
      }).toThrowError("Invalid position");
    });
    
    it("should throw an error if there is no piece at the specified position", () => {
      // Arrange
      const game = new ChessGame();
      const emptySquare = "c3"; // Empty position
    
      // Act & Assert
      expect(() => {
        game.killPiece(emptySquare);
      }).toThrowError("No piece at the specified position");
    });
  });
});
