import { renderToStaticMarkup } from "/home/nil/nil/isomux/node_modules/react-dom/server";
import { createElement } from "/home/nil/nil/isomux/node_modules/react";
import { Character } from "/home/nil/nil/isomux/ui/office/Character.tsx";
import { writeFileSync } from "fs";
const outfits: Record<string, any> = JSON.parse(process.argv[2]);
for (const [name, outfit] of Object.entries(outfits)) {
  for (const portrait of [true, false]) {
    const svg = renderToStaticMarkup(createElement(Character, { state: (process.argv[3] ?? "waiting_for_response") as any, outfit, portrait }));
    writeFileSync(`/tmp/bos-chars/${name}${portrait ? "-portrait" : ""}.svg`, svg);
  }
}
console.log("ok");
