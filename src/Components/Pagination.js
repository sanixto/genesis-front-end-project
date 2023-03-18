import { Pagination as PaginationReact } from 'react-bootstrap';
import { usePage } from '../PageContext';

function Pagination() {
  const items = [];
  const [pageInfo, setPageInfo] = usePage();

  for (let number = 1; number <= pageInfo?.totalPages; number += 1) {
    items.push(
      <PaginationReact.Item
        key={number}
        active={number === pageInfo.curPage}
        onClick={() => {
          setPageInfo((prev) => ({ ...prev, curPage: number }));
        }}
      >
        {number}
      </PaginationReact.Item>
    );
  }

  return (
    <PaginationReact className="justify-content-center my-4">
      {items}
    </PaginationReact>
  );
}

export default Pagination;
