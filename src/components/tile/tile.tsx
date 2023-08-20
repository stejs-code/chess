import {component$} from '@builder.io/qwik';
import {Piece} from "~/components/piece/piece";

export interface TileProps extends Tile {
    family: string
}

export function numToColumn(num: number): Tile["column"] {
    switch (num) {
        case 1:
            return "a"
        case 2:
            return "b"
        case 3:
            return "c"
        case 4:
            return "d"
        case 5:
            return "e"
        case 6:
            return "f"
        case 7:
            return "g"
        case 8:
            return "h"
    }
    return "a"
}

export interface Tile {
    column: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h",
    row: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    bg: "white" | "black",
    // piece?: "pawn" | "rook" | "knight" | "bishop" | "king" | "queen",
    piece?: "p" | "r" | "n" | "b" | "k" | "q",
    color?: "white" | "black",
}

export type TileName = `${Tile["row"]}${Tile["column"]}`

export const Tile = component$<TileProps>((props) => {
    return (
        <div
            class={`aspect-square flex items-center justify-center ${(props.bg === "white") ? "bg-slate-100" : "bg-lime-700"}`}>
            {props.piece && <Piece family={props.family} piece={props.piece} color={props.color ?? "white"}></Piece>}
        </div>
    );
});
