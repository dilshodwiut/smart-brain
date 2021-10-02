export default function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num;
    num++;
  }
}
