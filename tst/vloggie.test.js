import {
  testForValidItems,
  testForValidPages,
  validNumberOfAttributes
} from "../src/validation";
import testJson from "./testJson";

var assert = require("assert");

describe("testVloggie", function() {
  describe("#testForValidItems", function() {
    it("should return true when the value is in the whitelist", function() {
      let b = JSON.stringify(testJson.testOk);
      console.log(b);
      assert.equal(testForValidItems(b), true);
    });
    it("should return false when the value is not in the whitelist or missing", function() {
      let b = JSON.stringify(testJson.testNOkNohash);
      console.log(b);
      assert.equal(testForValidItems(b), false);
    });
    it("should return true when the obj has 5 attributes", function() {
      let b = testJson.testOk;
      assert.equal(validNumberOfAttributes(b), true);
    });
    it("should return false when the obj has more or less than 5 attributes", function() {
      let b = testJson.testNokToLong;
      assert.equal(validNumberOfAttributes(b), false);
    });
  });
  describe("#testPages", function() {
    it("should return true when the value is in the pageslist", function() {
      let b = testJson.testOk;
      console.log(b);
      assert.equal(testForValidPages(b.where), true);
    });
    it("should return false when the value is not in the pageslist", function() {
      let b = testJson.testNOkStrangePage;
      console.log(b);
      assert.equal(testForValidPages(b.where), false);
    });
  });
});
