const numCol(number) {
    var num = number - 1, chr;
    if (num <= 25) {
      chr = String.fromCharCode(97 + num).toUpperCase();
      return chr;
    } else if (num >= 26 && num <= 51) {
      num -= 26;
      chr = String.fromCharCode(97 + num).toUpperCase();
      return "A" + chr;
    } else if (num >= 52 && num <= 77) {
      num -= 52;
      chr = String.fromCharCode(97 + num).toUpperCase();
      return "B" + chr;
    } else if (num >= 78 && num <= 103) {
      num -= 78;
      chr = String.fromCharCode(97 + num).toUpperCase();
      return "C" + chr;
    }
  }

export {

}
