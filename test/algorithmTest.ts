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
 *        One Non-empty Set
 *        Multiple sequential Non-empty Sets
 *        Multiple non-sequential Non-empty Sets
 * 
 */
describe("toBucketSets()", () => {
  it("Covers Empty Bucket", () => {
    const buckets: BucketMap = new Map();
    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    assert.equal(bucketSet.length, 0);
  });
  it("Covers One Non-empty Set", () => {
    const flashcard = new Flashcard("front", "back", "hint", []);
    const flashSet = new Set<Flashcard>();
    flashSet.add(flashcard);

    const buckets: BucketMap = new Map();
    buckets.set(0, flashSet);

    const bucketSet: Array<Set<Flashcard>> = toBucketSets(buckets);
    const shouldBe = [flashSet];
    assert.deepEqual(bucketSet, shouldBe);
  });
  it("Covers Multiple sequential Non-empty Sets", () => {
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
  it("Covers Multiple non-sequential Non-empty Sets", () => {
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
 * Cover partitions:
 *    Empty Array
 *    Non-empty Array:
 *        One Empty Set
 *        One Non-empty Set
 *        Multiple Even Non-empty Sets
 *        Multiple Uneven Non-empty Sets
 *        
 */
describe("getBucketRange()", () => {
  it("Covers Empty Array", () => {
    const bucket: Array<Set<Flashcard>> = [];
    assert.equal(getBucketRange(bucket), undefined);
  });
  it("Covers One Empty Set", () => {
    const emptySet : Set<Flashcard> = new Set([]);
    const bucket: Array<Set<Flashcard>> = [emptySet];
    assert.equal(getBucketRange(bucket), undefined);
  });
  it("Covers One Non-empty Set", () => {
    const flashcard : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet : Set<Flashcard> = new Set([flashcard]);
    const bucket: Array<Set<Flashcard>> = [flashSet];
    assert.deepEqual(getBucketRange(bucket), { minBucket: 1, maxBucket: 1 });
  });
  it("Covers Multiple Even Non-empty Sets", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
      const flashcard2 : Flashcard = {
        front: "hello",
        back: "world",
        hint: "hint",
        tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1, flashcard2]);
    const flashSet2: Set<Flashcard> = new Set([flashcard1, flashcard2]);
    const bucket: Array<Set<Flashcard>> = [flashSet1, flashSet2];
    assert.deepEqual(getBucketRange(bucket), { minBucket: 2, maxBucket: 2});
  });
  it("Covers Multiple Uneven Non-empty Sets", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
      const flashcard2 : Flashcard = {
        front: "hello",
        back: "world",
        hint: "hint",
        tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1, flashcard2]);
    const flashSet2: Set<Flashcard> = new Set([flashcard1]);
    const bucket: Array<Set<Flashcard>> = [flashSet1, flashSet2];
    assert.deepEqual(getBucketRange(bucket), { minBucket: 1, maxBucket: 2});
  });
});

/*
 * Testing strategy for practice():
 *
 * Cover Carterian Product of Partitions:
 *    Empty Array
 *    Non-empty Array:
 *        One Empty Set
 *        One Non-empty Set
 *        Three Mixed Sets
 *  
 *    X
 *    Day <= 0
 *    Day 1
 *    Day 2
 *        
 *
 */
describe("practice()", () => {
  it("Covers Empty Array X Day < 0", () => {
    const bucket: Array<Set<Flashcard>> = [];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = -1;
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers Empty Array X Day 0", () => {
    const bucket: Array<Set<Flashcard>> = [];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 0
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers Empty Array X Day 1", () => {
    const bucket: Array<Set<Flashcard>> = [];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 1
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers Empty Array X Day 2", () => {
    const bucket: Array<Set<Flashcard>> = [];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 2
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers One Empty Set X Day < 0", () => {
    const flashSet : Set<Flashcard> = new Set([]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = -1;
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers One Empty Set X Day 0", () => {
    const flashSet : Set<Flashcard> = new Set([]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 0;
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers One Empty Set X Day 1", () => {
    const flashSet : Set<Flashcard> = new Set([]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 1;
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers One Empty Set X Day 2", () => {
    const flashSet : Set<Flashcard> = new Set([]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const emptySet : Set<Flashcard> = new Set([]);
    const day = 2;
    assert.deepEqual(practice(bucket, day), emptySet)
  });
  it("Covers One Non-empty Set X Day < 0", () => {
    const flashcard : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet : Set<Flashcard> = new Set([flashcard]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const day = -1;
    assert.deepEqual(practice(bucket, day), flashSet)
  });
  it("Covers One Non-empty Set X Day 0", () => {
    const flashcard : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet : Set<Flashcard> = new Set([flashcard]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const day = 0;
    assert.deepEqual(practice(bucket, day), flashSet)
  });
  it("Covers One Non-empty Set X Day 1", () => {
    const flashcard : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet : Set<Flashcard> = new Set([flashcard]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const day = 1;
    assert.deepEqual(practice(bucket, day), flashSet)
  });
  it("Covers One Non-empty Set X Day 2", () => {
    const flashcard : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet : Set<Flashcard> = new Set([flashcard]);
    const bucket : Array<Set<Flashcard>> = [flashSet];
    const day = 2;
    assert.deepEqual(practice(bucket, day), flashSet)
  });
  it("Covers Three Mixed Sets X Day < 0", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard2 : Flashcard = {
      front: "goodbye", 
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard3 : Flashcard = {
      front: "idk",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1]);
    const flashSet2 : Set<Flashcard> = new Set([flashcard2]);
    const flashSet3 : Set<Flashcard> = new Set([flashcard3]);
    const bucket = [flashSet1, flashSet2, flashSet3];
    const day = -1;
    assert.deepEqual(practice(bucket, day), flashSet1)
  })
  it("Covers Three Mixed Sets X Day 0", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard2 : Flashcard = {
      front: "goodbye", 
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard3 : Flashcard = {
      front: "idk",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1]);
    const flashSet2 : Set<Flashcard> = new Set([flashcard2]);
    const flashSet3 : Set<Flashcard> = new Set([flashcard3]);
    const bucket = [flashSet1, flashSet2, flashSet3];
    const day = 0;
    assert.deepEqual(practice(bucket, day), flashSet1)
  })
  it("Covers Three Mixed Sets X Day 1", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard2 : Flashcard = {
      front: "goodbye", 
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard3 : Flashcard = {
      front: "idk",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1]);
    const flashSet2 : Set<Flashcard> = new Set([flashcard2]);
    const flashSet3 : Set<Flashcard> = new Set([flashcard3]);
    const bucket = [flashSet1, flashSet2, flashSet3];
    const day = 1;
    assert.deepEqual(practice(bucket, day), flashSet1)
  })
  it("Covers Three Mixed Sets X Day 2", () => {
    const flashcard1 : Flashcard = {
      front: "hello",
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard2 : Flashcard = {
      front: "goodbye", 
      back: "world",
      hint: "hint",
      tags: []};
    const flashcard3 : Flashcard = {
      front: "idk",
      back: "world",
      hint: "hint",
      tags: []};
    const flashSet1 : Set<Flashcard> = new Set([flashcard1]);
    const flashSet2 : Set<Flashcard> = new Set([flashcard2]);
    const flashSet3 : Set<Flashcard> = new Set([flashcard3]);
    const resultSet : Set<Flashcard> = new Set();
    resultSet.add(flashcard1);
    resultSet.add(flashcard2);
    const bucket = [flashSet1, flashSet2, flashSet3];
    const day = 2;
    assert.deepEqual(practice(bucket, day), resultSet)
  })
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
