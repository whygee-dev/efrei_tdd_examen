export class ChessGame {
  #board: string[][];

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
  }

  private getCoords(square: string) {
    const row = 8 - parseInt(square[1]);
    const col = square.charCodeAt(0) - "a".charCodeAt(0);

    return [row, col];
  }

  castling() {
    throw new Error("Not implemented");
  }

  killPiece(position: { row: number, column: number }): void {
    // TODO: Implementer la logique pour supprimer une pièce du plateau
  }

  canMovePiece(initialSquare: string, newSquare: string): boolean {
    const initialCoords = this.getCoords(initialSquare);
    const newCoords = this.getCoords(newSquare);

    if (
      newCoords[0] < 0 ||
      newCoords[0] >= this.#board.length ||
      newCoords[1] < 0 ||
      newCoords[1] >= this.#board[0].length
    ) {
      return false;
    }

    const piece = this.#board[initialCoords[0]][initialCoords[1]];
    if (piece === " ") {
      return false; 
    }
    return this.#board[newCoords[0]][newCoords[1]] === " ";
  }

}