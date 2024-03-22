import { usePage } from "./store/PageContext";

import { pageComponents } from "./constants/page.tsx";

import "./style.scss";

const Home: React.FC = () => {
  const { activePage } = usePage();

  return (
    <div className='app' >
      <div className='wrapper'>
        {pageComponents[activePage]()}
      </div>
    </div>
  );
}

export default Home;
