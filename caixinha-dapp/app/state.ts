class ApplicationState {
  private wallets: string[];

  constructor() {
    this.wallets = [];
  }

  addPublicKey(publicKey: string) {
    if (this.wallets.includes(publicKey)) {
      return;
    }
    this.wallets.push(publicKey);
  }

  get walletsList() {
    return this.wallets;
  }
}

export default new ApplicationState();
