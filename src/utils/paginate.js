export function paginate(item, currentPage, pageSize) {
  return item
    .reverse()
    .slice(
      currentPage * pageSize,
      currentPage === 0 ? pageSize : pageSize * (currentPage + 1)
    );
}
