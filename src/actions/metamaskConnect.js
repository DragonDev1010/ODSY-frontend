const {ethereum} = window

const MetamaskConnect = async () => {
    if(!ethereum) {
        return {'error': 'Make sure you have Metamask installed'}
    }
    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        if(accounts.length > 0) {
            return {'address': accounts[0]}
        }
    } catch (e) {
        return {'error': e.message}
    }
}

export default MetamaskConnect