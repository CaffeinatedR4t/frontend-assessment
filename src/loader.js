export async function loader() {
  const res = await fetch('/frontend-assessment/data/indonesia_regions.json')
  if (!res.ok) throw new Error('Failed to load region data')
  const data = await res.json()
  return data
}