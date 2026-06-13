import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const SIZE = 13;

type Cell = { top: boolean; right: boolean; bottom: boolean; left: boolean; visited: boolean };

function buildMaze(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ top: true, right: true, bottom: true, left: true, visited: false }))
  );

  function carve(row: number, col: number) {
    grid[row][col].visited = true;
    const dirs = [[0,1,"right","left"],[0,-1,"left","right"],[1,0,"bottom","top"],[-1,0,"top","bottom"]] as const;
    const shuffled = [...dirs].sort(() => Math.random() - 0.5);
    for (const [dr, dc, wall, opp] of shuffled) {
      const nr = row + dr, nc = col + dc;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && !grid[nr][nc].visited) {
        (grid[row][col] as any)[wall] = false;
        (grid[nr][nc] as any)[opp] = false;
        carve(nr, nc);
      }
    }
  }
  carve(0, 0);
  return grid;
}

export function MazeGame() {
  const [maze,    setMaze]    = useState<Cell[][]>(buildMaze);
  const [pos,     setPos]     = useState<[number,number]>([0, 0]);
  const [steps,   setSteps]   = useState(0);
  const [won,     setWon]     = useState(false);
  const [time,    setTime]    = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  const move = useCallback((dr: number, dc: number) => {
    if (won) return;
    setPos(([r, c]) => {
      const cell = maze[r][c];
      let wall = "";
      if (dr === -1) wall = "top";
      if (dr ===  1) wall = "bottom";
      if (dc === -1) wall = "left";
      if (dc ===  1) wall = "right";
      if ((cell as any)[wall]) return [r, c];
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) return [r, c];
      setSteps(s => s + 1);
      if (!running) setRunning(true);
      if (nr === SIZE - 1 && nc === SIZE - 1) setWon(true);
      return [nr, nc];
    });
  }, [maze, won, running]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp"    || e.key === "w") { e.preventDefault(); move(-1, 0); }
      if (e.key === "ArrowDown"  || e.key === "s") { e.preventDefault(); move(1, 0); }
      if (e.key === "ArrowLeft"  || e.key === "a") { e.preventDefault(); move(0, -1); }
      if (e.key === "ArrowRight" || e.key === "d") { e.preventDefault(); move(0, 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move]);

  function restart() {
    setMaze(buildMaze()); setPos([0,0]); setSteps(0); setWon(false); setTime(0); setRunning(false);
  }

  const CELL = 24;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full">
        <span className="text-white/30 text-[7px]" style={px}>Steps: {steps}</span>
        <span className="text-[#5caf00] text-[7px]" style={px}>
          {String(Math.floor(time/60)).padStart(2,"0")}:{String(time%60).padStart(2,"0")}
        </span>
        <button onClick={restart} className="text-[7px] text-white/30 hover:text-white/60 border border-white/10 px-2 py-1" style={px}>
          New
        </button>
      </div>

      {won && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-3 border border-[#5caf00]/40 bg-[#5caf00]/5 w-full">
          <p className="text-[#5caf00] text-[8px]" style={px}>Escaped! {steps} steps · {time}s</p>
        </motion.div>
      )}

      {/* Maze grid */}
      <div
        className="relative border border-white/10"
        style={{ width: SIZE * CELL, height: SIZE * CELL, overflow: "hidden" }}
      >
        {maze.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="absolute"
              style={{
                left: c * CELL, top: r * CELL, width: CELL, height: CELL,
                borderTop:    cell.top    ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                borderRight:  cell.right  ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                borderBottom: cell.bottom ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                borderLeft:   cell.left   ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                background: r === SIZE-1 && c === SIZE-1 ? "rgba(252,190,4,0.15)" : "transparent",
              }}
            />
          ))
        )}

        {/* Goal */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: (SIZE-1)*CELL, top: (SIZE-1)*CELL, width: CELL, height: CELL }}
        >
          <span style={{ fontSize: CELL * 0.5 }}>🏆</span>
        </div>

        {/* Player */}
        <motion.div
          animate={{ left: pos[1] * CELL, top: pos[0] * CELL }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute flex items-center justify-center"
          style={{ width: CELL, height: CELL }}
        >
          <div className="w-3 h-3 bg-[#5caf00] rounded-sm" />
        </motion.div>
      </div>

      {/* D-pad for mobile */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        <div /><button onClick={() => move(-1, 0)} className="p-2 border border-white/10 text-white/50 hover:bg-white/5 text-xs">▲</button><div />
        <button onClick={() => move(0,-1)} className="p-2 border border-white/10 text-white/50 hover:bg-white/5 text-xs">◀</button>
        <button onClick={() => move(1, 0)} className="p-2 border border-white/10 text-white/50 hover:bg-white/5 text-xs">▼</button>
        <button onClick={() => move(0, 1)} className="p-2 border border-white/10 text-white/50 hover:bg-white/5 text-xs">▶</button>
      </div>
      <p className="text-white/15 text-[6px]" style={px}>Arrow keys or WASD to navigate</p>
    </div>
  );
}
