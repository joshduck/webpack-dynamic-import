export default function() {
  console.log("Render C, I will dynamically require A");
  import("./a").then(({ default: a }) => a());
}
