import { v4 } from "uuid";

type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function calculateComplexity(stringInfo: stringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

type LoggerServiceCallBack = (arg: string) => void;

export function toUpperCaseWithCb(
  arg: string,
  callback: LoggerServiceCallBack
) {
  if (!arg) {
    callback("Invalid argument!");
    return;
  }
  callback(`called function with ${arg}`);
  return arg.toUpperCase();
}

export class OtherStringUtils {
  public callExternalService() {
    console.log("abcdef");
  }
  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}
