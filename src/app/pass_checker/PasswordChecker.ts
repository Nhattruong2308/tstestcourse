export enum PasswordError {
  SHORT = "Password is too short",
  UPPER_CASE = "Password must have uppercase character",
  LOWER_CASE = "Password must have lowercase character",
  NUMBER = "At least one number required",
}

export interface CheckResult {
  valid: boolean;
  reason: PasswordError[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordError[] = [];
    this.checkForLength(password, reasons);
    this.checkForUppercase(password, reasons);
    this.checkForLowercase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reason: reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck: CheckResult = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reason);
    return {
      valid: basicCheck.reason.length > 0 ? false : true,
      reason: basicCheck.reason,
    };
  }

  private checkForNumber(password: string, reasons: PasswordError[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) reasons.push(PasswordError.NUMBER);
  }

  private checkForLength(password: string, reasons: PasswordError[]) {
    if (password.length < 8) reasons.push(PasswordError.SHORT);
  }

  private checkForUppercase(password: string, reasons: PasswordError[]) {
    if (password == password.toLowerCase())
      reasons.push(PasswordError.UPPER_CASE);
  }

  private checkForLowercase(password: string, reasons: PasswordError[]) {
    if (password == password.toUpperCase())
      reasons.push(PasswordError.LOWER_CASE);
  }
}
