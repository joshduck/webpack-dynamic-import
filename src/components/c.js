export default function() {
  console.log("I am C, I will dynamically require A");
  import("./a").then(({ default: a }) => a());
}
