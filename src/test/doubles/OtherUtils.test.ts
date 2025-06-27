import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe.skip("OtherUtils test suite", () => {
  describe.only("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;
    beforeEach(() => {
      sut = new OtherStringUtils();
    });
    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("asa");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation");
      });
      sut.callExternalService();
    });
  });

  describe.only("Tracking callbacks with Jest mocks", () => {
    const callBackMock = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("Trường", callBackMock);
      expect(actual).toBe("TRƯỜNG");
      expect(callBackMock).toHaveBeenCalledWith("called function with Trường");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe.only("Tracking callbacks", () => {
    let cbArgs = [];
    let timesCalled = 0;
    beforeEach(() => {
      timesCalled = 0;
    });

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }
    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("Trường", callBackMock);
      expect(actual).toBe("TRƯỜNG");
      expect(cbArgs).toContain("called function with Trường");
      expect(timesCalled).toBe(1);
    });
  });

  it("ToUppercase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUppercase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  xit("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "abc",
        field2: "def",
      },
    };
    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
