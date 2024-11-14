import walletRouter from './wallet/wallet-routes'

export default expressApp => {
    console.log('config routes')

    expressApp.use('/wallet', walletRouter)
}