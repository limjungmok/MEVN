export async function getCarouselsApi(URL) {
  const fetchResponse = await fetch(URL);
  const fetchData = await fetchResponse.json();

  return fetchData.data;
}