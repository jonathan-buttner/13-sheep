import CSS from "csstype";
import { BoardProps } from "boardgame.io/react";
import { State } from "./Game";
import useImage from "use-image";
import { Stage, Layer, Rect, Text, Image } from "react-konva";

const RectComp = () => {
  return (
    <Rect x={20} y={20} width={50} height={50} fill="black" shadowBlur={5} />
  );
};

export const Board = ({ ctx, moves, G }: BoardProps<State>) => {
  const [image] = useImage("/13_sheep_a.jpeg");
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image image={image} />
        <Text text="Try click on rect" />
        <RectComp />
      </Layer>
    </Stage>
  );
};

export const TicTacToeBoard = ({ ctx, moves, G }: BoardProps<State>) => {
  const onClick = (id: number) => {
    moves.clickCell(id);
  };

  let winner;
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  const cellStyle: CSS.Properties = {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
  };

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td style={cellStyle} key={id} onClick={() => onClick(id)}>
          {G.cells[id]}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
};
