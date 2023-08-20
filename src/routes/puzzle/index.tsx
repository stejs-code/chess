import {component$} from '@builder.io/qwik';
import type { TileName} from "~/components/tile/tile";
import {numToColumn, Tile} from "~/components/tile/tile";
import type {DocumentHead} from "@builder.io/qwik-city";
import { routeLoader$} from "@builder.io/qwik-city";
import * as fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

export default component$(() => {
    const data = useChessBoard()

    return (
        <div class={"flex items-center justify-center h-screen p-4"}>
            <div class={"w-full max-w-3xl aspect-square bg-black grid grid-cols-8 backlight"}>
                {Array.from(data.value.chessBoard).map(([key, value]) => (
                    <>
                        <Tile family={data.value.family} key={key} {...value}></Tile>
                    </>
                ))}
            </div>
        </div>
    );
});

export const useChessBoard = routeLoader$(async ({query}) => {
    const chessBoard = new Map<TileName, Tile>

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const row = Math.round(Math.random() * 400_000) + 1
    const puzzle = (await fs.promises.readFile(path.join(__dirname, "../../puzzles.txt")) as any).toString().split("\n")[row]
    const fen = puzzle.split("/")


    for (let row: Tile["row"] = 1; row <= 8; row++) {
        const fenRow = fen[row - 1]

        let skip = 0
        let skipped = 0

        for (let col = 1; col <= 8; col++) {
            if (skipped < skip) {
                skipped++

                chessBoard.set(`${numToColumn(col)}${row}` as TileName, {
                    row: row as Tile["row"],
                    column: numToColumn(col),
                    bg: (((row + 2) % 2) === 0) ? (((col % 2) === 0) ? "white" : "black") : (((col % 2) !== 0) ? "white" : "black"),
                })

                continue
            }

            let piece: Tile["piece"] = fenRow.charAt(col - 1 - skip) as Tile["piece"]
            let color: "white" | "black" | undefined = "black"

            if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(piece ?? "")) {
                skip = skip + Number(piece) - 1
                piece = undefined
            } else {
                if (piece !== undefined && piece === piece.toUpperCase()) {
                    color = "white"
                }
            }

            chessBoard.set(`${numToColumn(col)}${row}` as TileName, {
                row: row as Tile["row"],
                column: numToColumn(col),
                bg: (((row + 2) % 2) === 0) ? (((col % 2) === 0) ? "white" : "black") : (((col % 2) !== 0) ? "white" : "black"),
                piece: piece,
                color: color
            })

        }
    }


    return {
        family: query.get("icons") ?? "alpha",
        chessBoard: chessBoard
    }
})

export const head: DocumentHead = {
    title: "Random Puzzle",
};
