import walletRouter from "./wallet/wallet-routes";
import funcRouter from "./func/func-routes";

export default (expressApp) => {
  console.log("config routes");

  expressApp.use("/wallet", walletRouter);
  expressApp.use("/fn", funcRouter);
};
