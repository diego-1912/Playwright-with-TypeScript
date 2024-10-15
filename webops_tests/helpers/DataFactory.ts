export class DataFactory {
  // This method generates a random code consisting of two letters followed by four digits.
  // to input, Branch, Manufacturer, Hospital names....
  static generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${randomLetters}${randomDigits}`;
  }

  // Method for generating a random two-digit number (e.g. to input number of days)
  static generateTwoDigitNumber(): number {
    return Math.floor(10 + Math.random() * 90);
  }

  // Method for generating a random five-digit number  (e.g. to input zip codes)
  static generateFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  // Method for generating a random ten-digit number (e.g. to input phone and fax numbers)
  static generateTenDigitNumber(): number {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

   // Method for generating a random email
   static generateRandomEmail(): string {
    const domains = ['example.com', 'test.com', 'demo.com'];
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomName = Array.from({ length: 8 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomName}@${randomDomain}`;
  }

}
