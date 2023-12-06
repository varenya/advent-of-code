const newFish = 8;

function countLanternFish(lifeTime: string, days: number = 80): number {
  const input = lifeTime.split(",").map((num) => parseInt(num, 10));
  let day = 0;
  while (day < days) {
    let N = input.length;
    for (let i = 0; i < N; i++) {
      if (input[i] === 0) {
        input[i] = 6;
        input.push(newFish);
      } else {
        input[i]--;
      }
    }
    day++;
  }
  return input.length;
}

export { countLanternFish };
