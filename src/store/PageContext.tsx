import { createContext, useState, PropsWithChildren, useContext, useEffect } from "react";

import { PageType } from "../types/page.inteface";

interface PageContextData {
  activePage: PageType;
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
}

const PageContext = createContext<PageContextData>({} as PageContextData);

export const PageProvider = (props: PropsWithChildren) => {
  const [activePage, setActivePage] = useState<PageType>(PageType.WELCOME);

  useEffect(() => {
    chrome.storage.session.get('page', function (result) {
      if (!!result.page && activePage !== Number(result.page)) {
        setActivePage(Number(result.page))
      }
    });
  }, [])

  useEffect(() => {
    if (activePage === PageType.BALANCE || activePage === PageType.WELCOME) {
      chrome.storage.session.set({ 'page': String(activePage) });
    }
  }, [activePage])

  const value = { activePage, setActivePage };

  return (
    <PageContext.Provider value={value}>
      {props.children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);