export async function appFetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
