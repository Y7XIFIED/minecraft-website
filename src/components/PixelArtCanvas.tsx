import { useState, useRef } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const PALETTE = [
  "#5caf00","#3a7a00","#8d6443","#5c3d1e","#c8a882","#f0d9a0",
  "#3b6eca","#1d3a8a","#5cd4e0","#ffffff","#cccccc","#888888",
  "#444444","#111111","#e03030","#c87941","#fcbe04","#ff8800",
  "#6622aa","#aa44cc","#2ecc71","#e91e63","#ff5722","#795548",
];

const GRID = 16;
const CELL = 20;

type Grid = string[][];

function emptyGrid(): Grid {
  return Array.from({ length: GRID }, () => Array(GRID).fill("transparent"));
}

export function PixelArtCanvas() {
  const [grid, setGrid]       = useState<Grid>(emptyGrid);
  const [color, setColor]     = useState("#5caf00");
  const [tool, setTool]       = useState<"draw"|"erase"|"fill">("draw");
  const [painting, setPainting] = useState(false);
  const historyRef = useRef<Grid[]>([]);

  function saveHistory(g: Grid) {
    historyRef.current = [...historyRef.current.slice(-19), g.map(r => [...r])];
  }

  function paint(r: number, c: number) {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      if (tool === "erase") next[r][c] = "transparent";
      else if (tool === "draw") next[r][c] = color;
      else if (tool === "fill") {
        const target = prev[r][c];
        if (target === color) return prev;
        const stack = [[r, c]];
        while (stack.length) {
          const [cr, cc] = stack.pop()!;
          if (cr < 0 || cr >= GRID || cc < 0 || cc >= GRID) continue;
          if (next[cr][cc] !== target) continue;
          next[cr][cc] = color;
          stack.push([cr+1,cc],[cr-1,cc],[cr,cc+1],[cr,cc-1]);
        }
      }
      return next;
    });
  }

  function undo() {
    if (!historyRef.current.length) return;
    const prev = historyRef.current.pop()!;
    setGrid(prev.map(r => [...r]));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Palette */}
      <div className="flex flex-wrap gap-1">
        {PALETTE.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); setTool("draw"); }}
            className="w-5 h-5 border transition-all"
            style={{
              backgroundColor: c,
              borderColor: color === c && tool === "draw" ? "white" : "transparent",
              transform: color === c && tool === "draw" ? "scale(1.25)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Tools */}
      <div className="flex gap-2">
        {([["draw","✏️ Draw"],["erase","◻ Erase"],["fill","▣ Fill"]] as const).map(([t, l]) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            className={`px-3 py-1.5 text-[6px] border transition-colors ${tool === t ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/40"}`}
            style={px}
          >
            {l}
          </button>
        ))}
        <button onClick={undo} className="px-3 py-1.5 text-[6px] border border-white/10 text-white/40 hover:text-white/60" style={px}>↩ Undo</button>
        <button onClick={() => { saveHistory(grid); setGrid(emptyGrid()); }}
          className="px-3 py-1.5 text-[6px] border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30" style={px}>
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div
        className="border border-white/10 select-none"
        style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`, cursor: tool === "erase" ? "crosshair" : "cell" }}
        onMouseLeave={() => setPainting(false)}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: CELL, height: CELL,
                backgroundColor: cell === "transparent" ? (((r + c) % 2 === 0) ? "#1a1a1a" : "#111") : cell,
                border: "0.5px solid rgba(255,255,255,0.03)",
              }}
              onMouseDown={() => { setPainting(true); saveHistory(grid); paint(r, c); }}
              onMouseEnter={() => { if (painting) paint(r, c); }}
              onMouseUp={() => setPainting(false)}
            />
          ))
        )}
      </div>

      <p className="text-white/15 text-[6px] text-center" style={px}>Click and drag to paint · {GRID}×{GRID} grid</p>
    </div>
  );
}
