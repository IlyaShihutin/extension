import { createContext, useState, PropsWithChildren, useContext, useEffect } from "react";
import { WalletItem, WalletStatusType } from "../types/wallet.interface";

interface WalletContextData {
  wallet: WalletItem | null;
  setWallet: React.Dispatch<React.SetStateAction<WalletItem | null>>;
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData);

export const WalletProvider = (props: PropsWithChildren) => {
  const [wallet, setWallet] = useState<WalletItem | null>(null);

  useEffect(() => {
    chrome.storage.session.get('wallet', function (result) {
      if (!!result.wallet && JSON.stringify(wallet) !== result.wallet) {
        setWallet(JSON.parse(result.wallet))
      }
    });
  }, [])

  useEffect(() => {
    if (!wallet || wallet?.status === WalletStatusType.ACTIVE) {
      chrome.storage.session.set({ 'wallet': JSON.stringify(wallet) });
    }
  }, [wallet])

  const value = { wallet, setWallet };

  return (
    <WalletContext.Provider value={value}>
      {props.children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);