// Helper tool to compile the project for each target architecture

const outputLocation = "bin";

const config = JSON.parse(await Deno.readTextFile("deno.json")) as {
  version: string;
};

const targets: string[] = [
  "x86_64-unknown-linux-gnu",
  "aarch64-unknown-linux-gnu",
  "x86_64-pc-windows-msvc",
  "x86_64-apple-darwin",
  "aarch64-apple-darwin",
];

for (const target of targets) {
  const filename = `${outputLocation}/${target}/project_start_${
    config.version.replace(".", "_")
  }`;
  const bin = "deno";
  const args =
    `compile --allow-write --allow-read --allow-run --target ${target} --output ${filename} main.ts`;

  const cmd = new Deno.Command(bin, {
    args: args.split(" "),
  });

  await cmd.output();
  console.log(`Generated: ${filename}`);
}
