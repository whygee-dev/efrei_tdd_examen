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

  constructBoard() {
    const board = this.#board.map((row, i) => {
      return 8 - i + " " + row.join(" ");
    });

    board.push("  a b c d e f g h");

    return board.join("\n");
  }

  movePiece(from: string, to: string, castling = false) {
    if (!this.canMovePiece(from, to) && !castling) {
      throw new Error("Can't move piece to the specified position: " + from + " ->  " + to);
    }

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
        this.movePiece("e1", "g1", true);
        this.movePiece("h1", "f1", true);
      } else {
        this.movePiece("e1", "c1", true);
        this.movePiece("a1", "d1", true);
      }

      return;
    }

    if (color === "black") {
      if (side === "king") {
        this.movePiece("e8", "g8", true);
        this.movePiece("h8", "f8", true);
      } else {
        this.movePiece("e8", "c8", true);
        this.movePiece("a8", "d8", true);
      }

      return;
    }
  }

  killPiece(square: string): void {
    const [row, column] = this.getCoords(square);

    if (row < 0 || row >= this.#board.length || column < 0 || column >= this.#board[0].length) {
      throw new Error("Invalid position");
    }

    const piece = this.#board[row][column];

    if (piece === " ") {
      throw new Error("No piece at the specified position");
    }

    this.#board[row][column] = " ";
  }

  canMovePiece(from: string, to: string): boolean {
    const initialCoords = this.getCoords(from);
    const newCoords = this.getCoords(to);

    if (newCoords[0] < 0 || newCoords[0] >= this.#board.length || newCoords[1] < 0 || newCoords[1] >= this.#board[0].length) {
      return false;
    }

    const piece = this.#board[initialCoords[0]][initialCoords[1]];
    if (piece === " ") {
      return false;
    }

    const rowDiff = Math.abs(newCoords[0] - initialCoords[0]);
    const colDiff = Math.abs(newCoords[1] - initialCoords[1]);

    switch (piece) {
      case "♟":
        if (initialCoords[0] === 1) {
          if (newCoords[0] === initialCoords[0] + 1 || newCoords[0] === initialCoords[0] + 2) {
            if (newCoords[1] === initialCoords[1] && this.#board[newCoords[0]][newCoords[1]] === " ") {
              return true;
            }
          }
        } else {
          if (newCoords[0] === initialCoords[0] + 1 && newCoords[1] === initialCoords[1] && this.#board[newCoords[0]][newCoords[1]] === " ") {
            return true;
          }
        }
        break;
      case "♙":
        if (initialCoords[0] === 6) {
          if (newCoords[0] === initialCoords[0] - 1 || newCoords[0] === initialCoords[0] - 2) {
            if (newCoords[1] === initialCoords[1] && this.#board[newCoords[0]][newCoords[1]] === " ") {
              return true;
            }
          }
        } else {
          if (newCoords[0] === initialCoords[0] - 1 && newCoords[1] === initialCoords[1] && this.#board[newCoords[0]][newCoords[1]] === " ") {
            return true;
          }
        }
        break;
      case "♜":
      case "♖":
        if (rowDiff === 0 || colDiff === 0) {
          const rowStep = rowDiff === 0 ? 0 : newCoords[0] > initialCoords[0] ? 1 : -1;
          const colStep = colDiff === 0 ? 0 : newCoords[1] > initialCoords[1] ? 1 : -1;
          let i = initialCoords[0] + rowStep;
          let j = initialCoords[1] + colStep;

          while (i !== newCoords[0] || j !== newCoords[1]) {
            if (this.#board[i][j] !== " ") {
              return false;
            }
            i += rowStep;
            j += colStep;
          }

          return true;
        }
        break;
      case "♞":
      case "♘":
        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
          return true;
        }
        break;
      case "♝":
      case "♗":
        if (rowDiff === colDiff) {
          const rowStep = newCoords[0] > initialCoords[0] ? 1 : -1;
          const colStep = newCoords[1] > initialCoords[1] ? 1 : -1;
          let i = initialCoords[0] + rowStep;
          let j = initialCoords[1] + colStep;

          while (i !== newCoords[0] || j !== newCoords[1]) {
            if (this.#board[i][j] !== " ") {
              return false;
            }
            i += rowStep;
            j += colStep;
          }

          return true;
        }
        break;
      case "♛":
      case "♕":
        if ((rowDiff === 0 && colDiff > 0) || (rowDiff > 0 && colDiff === 0) || rowDiff === colDiff) {
          const rowStep = rowDiff === 0 ? 0 : newCoords[0] > initialCoords[0] ? 1 : -1;
          const colStep = colDiff === 0 ? 0 : newCoords[1] > initialCoords[1] ? 1 : -1;
          let i = initialCoords[0] + rowStep;
          let j = initialCoords[1] + colStep;

          while (i !== newCoords[0] || j !== newCoords[1]) {
            if (this.#board[i][j] !== " ") {
              return false;
            }
            i += rowStep;
            j += colStep;
          }

          return true;
        }
        break;
      case "♚":
      case "♔":
        if (rowDiff <= 1 && colDiff <= 1) {
          return true;
        }
        break;
    }

    return false;
  }
}
