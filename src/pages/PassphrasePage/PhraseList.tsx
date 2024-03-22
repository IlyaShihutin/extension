import React, { useEffect, useRef, useState } from "react";
import * as bip39 from "bip39";
import * as buffer from "buffer";

import { Connection, PublicKey, Keypair } from '@solana/web3.js';

import { usePage } from "../../store/PageContext";
import { useWallet } from "../../store/WalletContext";

import { WalletStatusType } from "../../types/wallet.interface";
import { PageType } from "../../types/page.inteface";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import "./style.scss";

window.Buffer = buffer.Buffer;

const PhraseList: React.FC = () => {
  const { wallet, setWallet } = useWallet();
  const { setActivePage } = usePage();
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(''));
  const [note, setNote] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  const timerRef = useRef<number | undefined>(undefined);

  const createPhrase = () => {
    const mnemonic = bip39.generateMnemonic();
    setMnemonicWords(mnemonic.split(' '))
  }
  useEffect(() => {
    if (wallet?.status === WalletStatusType.CREATE) {
      createPhrase()
    }
  }, [wallet])

  useEffect(() => {
    return () => timerRef && clearTimeout(timerRef.current);
  }, []);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newMnemonicWords = [...mnemonicWords];
    newMnemonicWords[index] = event.target.value;
    setMnemonicWords(newMnemonicWords);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, selectedIndex: number) => {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('Text').trim();
    const pastedWords = pastedData.split(' ');

    const newMnemonicWords = [...mnemonicWords];

    for (let i = 0; i < pastedWords.length && (selectedIndex + i) < newMnemonicWords.length; i++) {
      newMnemonicWords[selectedIndex + i] = pastedWords[i];
    }

    setMnemonicWords(newMnemonicWords);
  };

  const copyPhrase = () => {
    if (note) {
      clearTimeout(timerRef.current)
    }
    navigator.clipboard.writeText(mnemonicWords.join(' '))
    setNote("phrase copied")
    timerRef.current = window.setTimeout(() => setNote(''), 1000)
  };

  const openBalance = async () => {
    try {
      setLoad(true)
      const connection = new Connection('https://api.devnet.solana.com', 'recent');
      const seed = bip39.mnemonicToSeedSync(mnemonicWords.join(' '));
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const publicKey = new PublicKey(keypair.publicKey);
      const balance = await connection.getBalance(publicKey);
      setWallet({
        balance: balance / 1000000000,
        privateKey: 'privateKey',
        publicKey: String(publicKey),
        status: WalletStatusType.ACTIVE,
        phrase: mnemonicWords.join(' ')
      });

      setActivePage(PageType.BALANCE);
    } catch (error) {
      timerRef.current = window.setTimeout(() => setNote('wrong phrase'), 1000)
    } finally {
      setLoad(false)
    }
  };
  const phraseisValide = (): boolean => {
    return mnemonicWords.every(word => word.trim() !== '')
  }

  return (
    <div className='passphrase_wrapper' >
      {note && <p className="note">{note}</p>}
      <div className="passphrase_list">
        {mnemonicWords?.map((word, index) => (
          <Input
            key={index}
            value={word}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)}
            readOnly={wallet?.status === WalletStatusType.CREATE}
            onPaste={wallet?.status === WalletStatusType.RESTORE ? (event) => handlePaste(event, index) : undefined}
          />
        ))}
      </div>
      <Button onClick={copyPhrase} text={"Copy"} />
      <Button onClick={openBalance} text={load ? "Loading" : "Open Balance"} disabled={!phraseisValide() || load} />

    </div>
  );
}

export default PhraseList;
