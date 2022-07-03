import React, { useEffect } from 'react';
import Connect from "../Connect";
import Execute from "../Execute";
import Web3 from 'web3';
import Decode from "../Decode";
import Encode from "../Encode";

export default function MainPage(){

    const [isConnect,setIsConnect] = React.useState(false);
    const [account,setAccount] = React.useState();
    const [web3,setWeb3] = React.useState();

    const getProvider = ()=>{
        let provider;
        if(window.ethereum){
            provider=window.ethereum
            
        }else{
            window.alert("No metamask present")
        }
        return provider
    }
    const handleConnect = ()=>{
        let provider =  getProvider();
        if(provider == window.ethereum){
            console.log("in click true")
             provider.request({
                method:'eth_requestAccounts',
            }).then(account=>{
                console.log("in click then")
                setAccount(account[0])
                setIsConnect(true)
            }).catch(err=>{
                console.log("in click error  ",err)
            })
        }
        setWeb3(new Web3(provider))

    }

    useEffect(()=>{
        console.log("in click account ",account)
    },[account])

    return(
        <>  
            {isConnect ? 
            <Connect handleConnect={handleConnect} message="connected to metamask"/> : 
            <Connect handleConnect={handleConnect} message="connect to metamask"/>
            }
            
            <Execute web3={web3} account={account} isConnect={isConnect}/>
            <Encode web3={web3} isConnect={isConnect}/>
            <Decode web3={web3} isConnect={isConnect}/>
        </>
    )
}
