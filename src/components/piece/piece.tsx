import { component$ } from '@builder.io/qwik';
import type {Tile} from "~/components/tile/tile";

export interface PieceProps {
    piece: Exclude<Tile["piece"], undefined>,
    color: Tile["bg"],
    family: string
}

export const Piece = component$<PieceProps>((props) => {
  return (
    <div class={"w-5/6"}>
      <img width="200" height="200" src={`/icons/${props.family}/${props.color.charAt(0)}${props.piece.charAt(0).toUpperCase()}.svg`}/>
    </div>
  );
});
