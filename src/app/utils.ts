export class StringUtils {
  toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return toUpperText(arg);
  }
}

export function toUpperText(arg: string) {
  return arg.toUpperCase();
}

type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
