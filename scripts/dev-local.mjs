import { spawn } from "node:child_process";

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const children = [
  spawn(pnpm, ["run", "dev:api"], { stdio: "inherit" }),
  spawn(pnpm, ["-C", "client", "run", "dev"], { stdio: "inherit" }),
];

const stop = () => children.forEach((child) => child.kill());

for (const child of children) {
  child.on("exit", (code) => {
    stop();
    process.exit(code ?? 0);
  });
}
