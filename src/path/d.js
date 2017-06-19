export default function() {
  import("../b").then(({ default: b }) => {
    b();
  });
}
