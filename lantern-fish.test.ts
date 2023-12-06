import { describe, it, expect } from "vitest";
import { countLanternFish } from "./lantern-fish";

describe("Lantern", () => {
  it("should return the total number of fish after reproducing exponentially", () => {
    expect(countLanternFish("3,4,3,1,2", 80)).toEqual(5934);
  });
});
