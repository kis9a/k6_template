import esbuild from "esbuild";
import glob from "glob";

// glob sync
const entryPoints = glob.sync("./src/scenarios/**/*.ts");

// arguments
const args = process.argv.slice(2);

// option flags
let isWatch = false;

if (args.length > 0) {
  switch (args[0]) {
    case "-w":
      isWatch = true;
      break;
    default:
      break;
  }
}

// build options
const options = {
  entryPoints,
  outdir: "dist",
  bundle: true,
  sourcemap: true,
  minify: false,
  external: ["k6"],
  format: "esm",
  platform: "node",
  plugins: [],
  watch: isWatch
    ? {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("watch build succeeded:", result);
        },
      }
    : false,
};

// run bulid
esbuild
  .build(options)
  .catch((error) => {
    console.error(error);
  })
  .then(() => {
    if (isWatch) {
      console.log("watching save...");
    }
  });
