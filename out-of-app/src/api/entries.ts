import { api } from "./client";

export async function getEntries(page = 1, limit = 20) {
  const res = await api.get("/entries", {
    params: { page, limit }
  });
  return res.data;
}
