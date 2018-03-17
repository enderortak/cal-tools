export const TryParseNumber = (data) => {
  const tpf = str =>
    ((str !== null && str.length > 0 && !isNaN(str)) ?
      parseFloat(str) : str);

  if (typeof (data) !== "object") return tpf(data);
  if (Array.isArray(data)) return data.map(i => TryParseNumber(i));
  let newObj = {}; // eslint-disable-line
  Object.keys(data).forEach((i) => { newObj[i] = TryParseNumber(data[i]); });
  return newObj;
};

export const GetBuffer = (files, callback) => {
  const f = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    let data = e.target.result;
    data = new Uint8Array(data);
    callback(data);
  };
  reader.readAsArrayBuffer(f);
};

export const GetTrace = (data, param) => data.map(i => i[param]);
export const GetTraceList = (data) => {
  let keyArray = []; // eslint-disable-line
  data.forEach(i => Object.keys(i).forEach((k) => { if (!keyArray.includes(k)) keyArray.push(k); }));
  return keyArray.map(i => ({ name: i, numberOfValues: data.filter(k => k[i] !== undefined).length }));
};

