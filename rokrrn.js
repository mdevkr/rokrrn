// YYMMDD-ABBCCDE
String.format = function() { let args = arguments; return args[0].replace(/{(\d+)}/g, function(match, num) { num = Number(num) + 1; return typeof(args[num]) != undefined ? args[num] : match; }); }

function testRRN(rrn) {
  if ( undefined == rrn || rrn.length != 13)
    return false;

  if (!/^\d+$/.test(rrn))
    rrn = rrn.replaceAll(/\D/gi, "");

  return getE(rrn) == rrn.charAt(12);
}

function newRRN(yymmdd, male) {
  if (undefined == yymmdd || yymmdd.length != 6 || undefined == male || male.constructor != Boolean)
    return undefined;

  var yy = yymmdd.substring(0, 2);
  var mm = yymmdd.substring(2, 4);
  var dd = yymmdd.substring(4, 6);

  if ((mm - 0) < 1 || (mm - 0) > 12)
    return undefined;
  if ((dd - 0) < 1 || (dd - 0) > mdim(mm))
    return undefined;

  var a = yy > getCurrentYY() ? (male ? 1 : 2) : (male ? 3 : 4);
  var b = (b = rInt(1, 96)) < 10 ? "0" + b : "" + b;
  var c = (c = rInt(1, 66)) < 10 ? "0" + c : "" + c;
  var d = rInt(1, 10);
  var f = String.format('{0}{1}{2}{3}{4}', yymmdd, a, b, c, d);
  f = String.format('{0}-{1}{2}{3}{4}{5}', yymmdd, a, b, c, d, getE(f));

  if (f.length > 14)
    return newRRN(yymmdd, male);
  return f;
}

function getE(rrn) {
  if (rrn.length < 13)
    rrn += '1';

  var a = 0;
  var b;
  var c = 11;

  for (var i = 0; i < 12; i++) {
    b = i + 2 > 9 ? (i + 2) - 8 : i + 2;
    a += rrn.charAt(i) * b;
  }

  while (c < a)
  	c += 11;

  return c - a;
}

function rInt(a,b) {
  var min = Math.ceil(a);
  var max = Math.floor(b);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCurrentYY() {
  return new Date().getFullYear().toString().substring(2, 4);
}

function mdim(m, yy) {
    var y = yy > getCurrentYY() ? '19' + yy : '20' + yy;
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
}
