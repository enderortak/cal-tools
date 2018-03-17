/** @module Parser */
import XLSX from "xlsx";

/**
 * Enum for parsing methods.
 * @readonly
 * @enum {string}
 * @property {string} COL_BY_COL
    *
    * This method treats every column as a data-trace. <br />
    * Return value format:
    * <pre>
    * [
    *    {
    *        Col1: ...,
    *        Col2: ...,
    *        ...
    *        Coln: ...
    *    },
    *    {...}
    * ]
    *</pre>
 * @property {string} LOOKUP_TABLE
    *
    * This method tries to parse input data as a lookup table. <br />
    * Return value format:
    * | name             | argument     | triggering UI event |
    * | :--------------- | :----------  | :------------------ |
    * | WIDGETSELECTED   | none         | onClick             |
    * <pre>
    * [
    *    {
    *        Col1: ...,
    *        Col2: ...,
    *        ...
    *        Coln: ...
    *    },
    *    {...}
    * ]
    *</pre>
 */

export const ParsingMethod = {

  COL_BY_COL: "COL_BY_COL",
  LOOKUP_TABLE: "LOOKUP_TABLE",
  CELL_REF: "CELL_REF",
};
export const ParseSheet = (worksheet, o) => {
  switch (o.parsingMethod) {
    case ParsingMethod.COL_BY_COL: return XLSX.utils.sheet_to_json(worksheet);
    case ParsingMethod.LOOKUP_TABLE: {
      const table = {};
      const dataArray = XLSX.utils.sheet_to_json(worksheet);
      dataArray.forEach((i) => {
        const row = { ...i };
        delete row[Object.keys(row)[0]];
        table[i[Object.keys(i)[0]]] = row;
      });
      return table;
    }
    case ParsingMethod.CELL_REF: {
        let values = {}; // eslint-disable-line
      o.cellRef.forEach((i) => { values[i] = worksheet[i].v; });
      return values;
    }
    default: return null;
  }
};

