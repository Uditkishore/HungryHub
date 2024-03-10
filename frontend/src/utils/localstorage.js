function loadData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (error) {
    return undefined;
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function clearData(key) {
  localStorage.removeItem(key);
}

export { loadData, saveData, clearData };
