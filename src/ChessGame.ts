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
    const { row, column } = position;
    if (row < 0 || row >= this.#board.length || column < 0 || column >= this.#board[0].length) {
      throw new Error("Invalid position");
    }
    
    const piece = this.#board[row][column];
    if (piece === " ") {
      throw new Error("No piece at the specified position");
    }
  
    this.#board[row][column] = " ";
  }

  canMovePiece(initialPosition: { row: number, column: number }, newPosition: { row: number, column: number }): boolean {
   
    if (
      newPosition.row < 0 ||
      newPosition.row >= this.#board.length ||
      newPosition.column < 0 ||
      newPosition.column >= this.#board[0].length
    ) {
      return false;
    }

   
    const piece = this.#board[initialPosition.row][initialPosition.column];
    if (piece === " ") {
      return false; 
    }
    return this.#board[newPosition.row][newPosition.column] === " ";
  }
}
