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

  constructBoard() {
    const board = this.#board.map((row, i) => {
      return 8 - i + " " + row.join(" ");
    });

    board.push("  a b c d e f g h");

    return board.join("\n");
  }

  movePiece(from: string, to: string) {
    throw new Error("Not implemented");
  }
}
