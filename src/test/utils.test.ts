import { getStringInfo, StringUtils, toUpperText } from "../app/utils";
describe("Utils test suite", () => {
  describe.only("StringUtils tests", () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log("Setup");
    });

    afterEach(() => {
      // clearing mocks
      console.log("Teardown");
    });

    it.only("should return uppercase of valid string", () => {
      console.log("actual");
      // arrange:
      const expected = "AB";

      // act
      const actual = sut.toUpperCase("abc");

      // assert
      expect(actual).toBe(expected);
    });

    it("should throw error on invalid string - function", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }
      expect(expectError).toThrow();
      expect(expectError).toThrow("Invalid argument!");
    });

    it("should throw error on invalid string - arrow function", () => {
      expect(() => {
        sut.toUpperCase("");
      }).toThrow("Invalid argument!");
    });

    it("should throw error on invalid string - try catch block", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  describe("ToUpperCase Examples", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])('"$input" toUpperCase should be "$expected"', ({ input, expected }) => {
      const actual = toUpperText(input);
      expect(actual).toBe(expected);
    });
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters.length).toBe(9);
      expect(actual.characters).toHaveLength(9);
      expect(actual.length).toBe(9);
      expect(actual.length).toBe(actual.characters.length);
    });

    test("return right lowercase", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });

    test("return right uppercase", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right extraInfo", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
    });

    test("return right charaters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);

      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
      );
    });
  });
});
