export class ChessGame {
  #board: string[][];
  #hasWhiteKingMoved = false;
  #hasBlackKingMoved = false;
  #hasWhiteKingSideRookMoved = false;
  #hasWhiteQueenSideRookMoved = false;
  #hasBlackKingSideRookMoved = false;
  #hasBlackQueenSideRookMoved = false;

  constructor() {
    this.#board = [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ];
  }

  get board() {
    return this.#board;
  }

  set board(board: string[][]) {
    if (board.length !== 8) {
      throw new Error("Invalid board size");
    }

    if (board.some((row) => row.length !== 8)) {
      throw new Error("Invalid board size");
    }

    this.#board = board;
  }

  constructBoard() {
    const board = this.#board.map((row, i) => {
      return 8 - i + " " + row.join(" ");
    });

    board.push("  a b c d e f g h");

    return board.join("\n");
  }

  movePiece(from: string, to: string) {
    const fromCoords = this.getCoords(from);
    const toCoords = this.getCoords(to);

    this.board[toCoords[0]][toCoords[1]] = this.board[fromCoords[0]][fromCoords[1]];
    this.board[fromCoords[0]][fromCoords[1]] = " ";

    if (from === "e1" && !this.#hasWhiteKingMoved) {
      this.#hasWhiteKingMoved = true;
    }

    if (from === "e8" && !this.#hasBlackKingMoved) {
      this.#hasBlackKingMoved = true;
    }

    if (from === "a1" && !this.#hasBlackQueenSideRookMoved) {
      this.#hasWhiteQueenSideRookMoved = true;
    }

    if (from === "h1" && !this.#hasBlackKingSideRookMoved) {
      this.#hasWhiteKingSideRookMoved = true;
    }

    if (from === "a8" && !this.#hasBlackQueenSideRookMoved) {
      this.#hasBlackQueenSideRookMoved = true;
    }

    if (from === "h8" && !this.#hasBlackKingSideRookMoved) {
      this.#hasBlackKingSideRookMoved = true;
    }
  }

  private getCoords(square: string) {
    const row = 8 - parseInt(square[1]);
    const col = square.charCodeAt(0) - "a".charCodeAt(0);

    return [row, col];
  }

  private canCastle(color: "white" | "black", side: "king" | "queen"): { can: boolean; reason?: string } {
    if (color === "white") {
      if (this.#hasWhiteKingMoved) {
        return { can: false, reason: "White king has already moved" };
      }

      if (side === "king") {
        if (this.#hasWhiteKingSideRookMoved) {
          return { can: false, reason: "White king side rook has already moved" };
        }
      }

      if (side === "queen") {
        if (this.#hasWhiteQueenSideRookMoved) {
          return { can: false, reason: "White queen side rook has already moved" };
        }
      }
    }

    if (color === "black") {
      if (this.#hasBlackKingMoved) {
        return { can: false, reason: "Black king has already moved" };
      }

      if (side === "king") {
        if (this.#hasBlackKingSideRookMoved) {
          return { can: false, reason: "Black king side rook has already moved" };
        }
      }

      if (side === "queen") {
        if (this.#hasBlackQueenSideRookMoved) {
          return { can: false, reason: "Black queen side rook has already moved" };
        }
      }
    }

    return { can: true };
  }

  castling(color: "white" | "black", side: "king" | "queen") {
    const canCastle = this.canCastle(color, side);

    if (!canCastle.can) {
      throw new Error(canCastle.reason);
    }

    if (color === "white") {
      if (side === "king") {
        this.movePiece("e1", "g1");
        this.movePiece("h1", "f1");
      } else {
        this.movePiece("e1", "c1");
        this.movePiece("a1", "d1");
      }

      return;
    }

    if (color === "black") {
      if (side === "king") {
        this.movePiece("e8", "g8");
        this.movePiece("h8", "f8");
      } else {
        this.movePiece("e8", "c8");
        this.movePiece("a8", "d8");
      }

      return;
    }
  }

  killPiece(position: { row: number; column: number }): void {
    // TODO: Implementer la logique pour supprimer une pièce du plateau
  }

  canMovePiece(initialPosition: { row: number; column: number }, newPosition: { row: number; column: number }): boolean {
    // Method declaration without implementation
    throw new Error("Method not implemented");
  }
}
