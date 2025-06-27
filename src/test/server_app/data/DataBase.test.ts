import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe.skip("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>;
  const fakeId = "1234";
  const someObj = {
    id: "abc",
    name: "abc",
    color: "blue",
  };

  const someObj1 = {
    id: "xyz",
    name: "xyz",
    color: "blue",
  };

  const someObj2 = {
    id: "def",
    name: "def",
    color: "blue",
  };
  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const actual = await sut.insert({ id: "" } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const id = await sut.insert(someObj);
    const actual = await sut.getBy("id", id);
    expect(actual).toBe(someObj);
  });

  it("should find all element by key", async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);
    const expected = [someObj1, someObj2];
    const actual = await sut.findAllBy("color", "blue");
    expect(actual).toEqual(expected);
  });

  it("should change color on object", async () => {
    const id = await sut.insert(someObj1);
    const expected_color = "red";
    await sut.update(id, "color", "red");
    const actual_upd = await sut.getBy("id", id);
    expect(actual_upd.color).toBe(expected_color);
  });

  it("should delete object", async () => {
    const id = await sut.insert(someObj1);
    await sut.delete(id);
    const actual = await sut.getBy("id", id);
    expect(actual).toBeUndefined();
  });

  it("should get all elements", async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);
    const expected = [someObj1, someObj2];
    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});
