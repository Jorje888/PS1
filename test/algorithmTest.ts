import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
  isPrime,
} from "../src/algorithm";

describe("isPrime()", () => {
  it("See if 8 is prime - should return false", () => {
    const num: number = 8;
    assert.equal(isPrime(num), false);
  });
  it("See if 7 is prime - should return true", () => {
    const num: number = 7;
    assert.equal(isPrime(num), true);
  });
  it("See if -1 is prime - should return false", () => {
    const num: number = 0;
    assert.equal(isPrime(num), false);
  });
  it("See if max int is prime - should return false", () => {
    const num: number = Number.MAX_VALUE;
    assert.equal(isPrime(num), false);
  });
});




/*
 * Testing strategy for toBucketSets():
 * 
 * Cover partitions:
 *    Empty Bucket
 *    Non-empty Bucket:
 *        One Non-empty Bucket
 *        Multiple sequential Non-empty Buckets
 *        Multiple non-sequential Non-empty Buckets
 * 
 */
describe("toBucketSets()", () => {
  it("Covers Empty Bucket", () => {
    const buckets: BucketMap = new Map();
    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    assert.equal(bucketSet.length, 0);
  });
  it("Covers One Non-empty Bucket", () => {
    const flashcard = new Flashcard("front", "back", "hint", []);
    const flashSet = new Set<Flashcard>();
    flashSet.add(flashcard);

    const buckets: BucketMap = new Map();
    buckets.set(0, flashSet);

    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    const shouldBe = [flashSet];
    assert.deepEqual(bucketSet, shouldBe);
  });
  it("Covers Multiple sequential Non-empty Buckets", () => {
    const flashcard = new Flashcard("front", "back", "hint", []);
    const flashSet = new Set<Flashcard>();
    flashSet.add(flashcard);

    const buckets: BucketMap = new Map(); 
    buckets.set(0, flashSet);
    buckets.set(1, flashSet);
    buckets.set(2, flashSet);

    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    const shouldBe = [flashSet, flashSet, flashSet];
    assert.deepEqual(bucketSet, shouldBe);
  })
  it("Covers Multiple non-sequential Non-empty Buckets", () => {
    const flashcard = new Flashcard("front", "back", "hint", []);
    const flashSet = new Set<Flashcard>();
    const emptySet = new Set<Flashcard>();
    flashSet.add(flashcard);  

    const buckets: BucketMap = new Map(); 
    buckets.set(0, flashSet);
    buckets.set(2, flashSet);
    buckets.set(5, flashSet);

    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    const shouldBe = [flashSet, emptySet, flashSet, emptySet, emptySet, flashSet];
    assert.deepEqual(bucketSet, shouldBe);
  })
});

/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for practice():
 *
 * TODO: Describe your testing strategy for practice() here.
 */
describe("practice()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});
