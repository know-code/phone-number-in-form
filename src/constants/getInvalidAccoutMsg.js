export function getInvalidAccoutMsg(countryCode, acctNum) {
  console.log("from func", countryCode, acctNum);
  switch (countryCode) {
    case "USA":
      if (acctNum.length < 6)
        return { message: "Account number is too short", valid: false };
      if (acctNum.length > 17)
        return { valid: false, message: "Account number is too long" };

      return { valid: true, message: "" };

    case "KEN":
      if (acctNum.length < 8)
        return { message: "Account number is too short", valid: false };
      if (acctNum.length > 20)
        return { valid: false, message: "Account number is too long" };

      return { valid: true, message: "" };

    case "NGA":
      if (acctNum.length < 10)
        return { message: "Account number is too short", valid: false };
      if (acctNum.length > 10)
        return { valid: false, message: "Account number is too long" };

      return { valid: true, message: "" };

    default:
      return { valid: true, message: "" };
  }
}
