import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire(process.cwd() + "/package.json");
const { chromium } = require("@playwright/test");
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await page.setContent("<main><ul></ul></main>");
  const results = await page.evaluate(() => {
    const list = document.querySelector("ul");
    const row =
      "<li><button>Generic tool title</button><dl><dt>Id</dt><dd>sample:1</dd><dt>Work</dt><dd>sample</dd><dt>Kind</dt><dd>rule</dd><dt>Transform</dt><dd>untyped</dd></dl></li>";
    const results = [];
    for (const count of [50, 3463]) {
      const times = [];
      for (let i = 0; i < 5; i++) {
        list.replaceChildren();
        const start = performance.now();
        list.innerHTML = row.repeat(count);
        void list.getBoundingClientRect();
        times.push(performance.now() - start);
      }
      results.push({
        rows: count,
        elements: list.querySelectorAll("*").length,
        medianMs: times.sort((a, b) => a - b)[2],
      });
    }
    return results;
  });
  const receipt = {
    date: new Date().toISOString(),
    scope:
      "Synthetic Chromium DOM insertion and layout, same representative row, five samples per arm; not an Angular end-to-end timing.",
    choice: "50 rows per page",
    results,
  };
  writeFileSync(
    new URL("./render-comparison.json", import.meta.url),
    JSON.stringify(receipt, null, 2) + "\n",
  );
  console.log(JSON.stringify(receipt));
} finally {
  await browser.close();
}
