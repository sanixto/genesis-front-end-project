import { createContext, useContext, useMemo, useState } from 'react';

const PageContext = createContext();

export function PageProvider({ children }) {
  const [pageInfo, setPageInfo] = useState({
    curPage: 1,
    totalPages: null,
  });

  const value = useMemo(
    () => [pageInfo, setPageInfo],
    [pageInfo.curPage, pageInfo.totalPages]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export const usePage = () => useContext(PageContext);
