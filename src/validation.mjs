//whitelisting of options
export function testForValidItems(body) {
  return (
    includes( body, "where") &&
  includes( body, "what") &&
  includes( body, "when") &&
  includes( body, "value") && 
  includes( body, "hash") 
  );
}

export function validNumberOfAttributes(obj) {
  return (Object.keys(obj).length === 5);
}
 
//whitelisting of pages
export function testForValidPages(page) {
  return (
    page != null &&
    (is(page, "index") ||
      is(page, "services") ||
      is(page, "contact"))
  );
}

export function testIfString(value) {
  return (typeof value === "string" );
}

function includes (str, what) {
  return (str.indexOf(what) > -1);
}

function is(string, what) {
  return (string === what);
}

