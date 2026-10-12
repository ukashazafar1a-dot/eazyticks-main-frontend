export function addSearch(value) {
  if (value === "" || value.length < 3) return;
  let search = window.localStorage.getItem("search");
  if (search) {
    search = JSON.parse(search);
    let regex = new RegExp(search.join("|"), "i");
    if (regex.test(value)) return;
    if (search.length > 2) {
      search.pop();
      search.unshift(value);
    } else {
      search.unshift(value);
    }
  } else {
    search = [value];
  }
  if (typeof window !== undefined) {
    window.localStorage.setItem("search", JSON.stringify(search));
  }
}

export function getSearch() {
  if (typeof window !== undefined) {
    let search = window.localStorage.getItem("search");
    if (search) return JSON.parse(search);
    return search;
  }else{
    return null;
  }
}
