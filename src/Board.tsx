import CSS from "csstype";
import { BoardProps } from "boardgame.io/react";
import { State } from "./Game";
import useImage from "use-image";
import { Stage, Layer, Rect, Image, Group } from "react-konva";
import { KonvaEventObject, Node } from "konva/types/Node";
import React from "react";
import Konva from "konva";

const RectComp = ({ pos }: { pos: Konva.Vector2d }) => {
  return (
    <Rect
      x={pos.x}
      y={pos.y}
      width={50}
      height={50}
      fill="black"
      shadowBlur={5}
    />
  );
};

const getMousePosition = (node: Node) => {
  const transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  const pos = node.getStage()?.getPointerPosition() ?? { x: 0, y: 0 };

  // now we can find relative point
  return transform.point(pos);
};

export const Board = ({ ctx, moves, G }: BoardProps<State>) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const [image] = useImage("/13_sheep_a.jpeg");
  const groupRef = React.useRef<Konva.Group>(null);
  const layerRef = React.useRef<Konva.Layer>(null);
  // const rectRef = React.useRef<Konva.Rect>(null);

  const mouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (groupRef.current) {
      const mousePos = getMousePosition(groupRef.current);
      setPos(mousePos);
      // layerRef.current?.batchDraw();
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={mouseMove}
    >
      <Layer ref={layerRef}>
        <Image image={image} />
        <Group ref={groupRef}>
          <RectComp pos={pos} />
        </Group>
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
