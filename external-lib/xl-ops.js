/** @module PublicInterface */
import XLSX from "xlsx";
import { ParsingMethod, ParseSheet } from "./xl-ops.parser";
import { GetBuffer, GetTrace, GetTraceList, TryParseNumber } from "./xl-ops.utility";


/**
 * Entry point for the library.
 * Returns the data parsed from Excel file accorrding to provided options
 * @function
 * @access public
 * @param {blob} data
 * @param {object} options
 * @return {object} parsedData
 * @todo Better documentation
 * @todo Better documentation
 * @todo Better documentation
 */
export const Read = (data, options) => {
  const defaultOptions = {
    sheetIndex: 0,
    parsingMethod: ParsingMethod.COL_BY_COL,
    cellRef: [],
    tryParsingNumbers: false,
  };
  const o = { ...defaultOptions, ...options };
  const workbook = XLSX.read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[o.sheetIndex]];
  let xlData = ParseSheet(worksheet, o);
  if (o.tryParsingNumbers) xlData = TryParseNumber(xlData, o.parsingMethod);
  return xlData;
};
export const ReadFile = (filePath, options) => {
  const defaultOptions = {
    sheetIndex: 0,
    parsingMethod: ParsingMethod.COL_BY_COL,
    cellRef: [],
  };
  const o = { ...defaultOptions, ...options };
  const workbook = XLSX.readFile(filePath, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[o.sheetIndex]];
  let xlData = ParseSheet(worksheet, o);
  if (o.tryParsingNumbers) xlData = TryParseNumber(xlData, o.parsingMethod);
  return xlData;
};
export { GetBuffer, GetTrace, GetTraceList, ParsingMethod };
