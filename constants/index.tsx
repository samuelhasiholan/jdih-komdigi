export const yearList = () => {
  let data = [];
  let key = 1;
  for (var i = new Date().getFullYear(); i >=1994; i--) {
    data.push({key: key, label: i.toString(), value: i.toString()});
    key++;
  }
  return data;
}