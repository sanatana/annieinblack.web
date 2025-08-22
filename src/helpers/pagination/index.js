const calculatePages = (inputCount, inputPerPageLimit, inputCurrentPage = 1) => {
  const perPageLimit = parseInt(inputPerPageLimit || '0', 10);
  const currentPage = parseInt(inputCurrentPage || '0', 10);
  const count = parseInt(inputCount || '0', 10);

  const boundaryCount = 1;
  const siblingCount = 1;

  let totalPages = Math.ceil(count / perPageLimit);

  if (totalPages < 1) {
    totalPages = 1;
  }

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
  );

  const itemList = [
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ['ellipsis']
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis

    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ['ellipsis']
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),

    ...endPages,
  ];

  const pagination = itemList.map((item, index) => {
    return typeof item === 'number'
      ? {
        ellipses: false,
        page: item,
        index,
      }
      : {
        ellipses: item === 'ellipsis',
        page: index,
        index,
      };
  });

  return pagination;
};

const calculateStartAt = (page, itemsPerPage) => {
  return (((page || 1) * itemsPerPage) - itemsPerPage) + 1;
};

export {
  calculatePages,
  calculateStartAt
};
