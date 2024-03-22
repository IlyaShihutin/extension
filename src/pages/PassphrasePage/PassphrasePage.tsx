import { usePage } from "../../store/PageContext";
import { useWallet } from "../../store/WalletContext";

import { PageType } from "../../types/page.inteface";

import Button from "../../components/Button/Button";

import PhraseList from "./PhraseList";

import "./style.scss";

const PassphrasePage: React.FC = () => {
  const { setWallet } = useWallet();
  const { setActivePage } = usePage();

  const goWelcomePage = () => {
    setActivePage(PageType.WELCOME)
    setWallet(null)
  }

  return (
    <div className='passphrase' >
      <h3 className='passphrase_title'>Mnemonic Phrase:</h3>
      <PhraseList />
      <Button onClick={goWelcomePage} text={"Go back"} />
    </div>
  );
}

export default PassphrasePage;
