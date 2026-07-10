export function getUsername(item) {
  return item?.string_list_data?.[0]?.value
    || item?.value
    || item?.username
    || null;
}