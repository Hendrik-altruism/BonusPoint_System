/**
 * Module with functions to support other modules
 */

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Hilfsfunktion um einen String zu einem validen Key zu machen -> Umlaute und Andere werden entfernt
 * @param {String} str  -   Eingabe-String
 * @returns {String}    -   Ausgabe-String als Key
 */
export function toKey(str) {
  return str.trim().replace(/\W/g, "");
}
