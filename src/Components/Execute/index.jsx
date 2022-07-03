import React from "react";
import "./style.css";

export default function Execute(props) {
  const [toAddress, setToAddress] = React.useState();
  const [encodedData, setEncodedData] = React.useState();
  const [checkAddress,setCheckAddress] = React.useState(false);
  const [checkData,setCheckData] = React.useState(false);

  const handleSent = (event) => {
    event.preventDefault();
    console.log("in sent  ", encodedData);
    if (
      /^(0x){1}[0-9a-fA-F]{40}$/i.test(toAddress) &&
      props.web3.utils.isAddress(toAddress) &&
      toAddress != "0x0000000000000000000000000000000000000000"
    ) {
        
        if(encodedData!=null&&encodedData!=undefined) 
        {   
            if(encodedData.trim() !== "")
            {
                console.log("in sent true")    
                try 
                {
                    props.web3.eth.sendTransaction({
                    from: props.account,
                    to: toAddress,
                    data: encodedData,
                    });
                } catch (err) {
                    console.log("err ", err);
                }
                
            }else{
                setCheckData("Please enter the field") 
            }
        }else{
            setCheckData("Please enter the field")
        }
    }else{
        setCheckAddress("Please enter valid address")
    }
    
  };

  const handleNone = (event)=>{
      event.preventDefault();
  }

  const handleToAddress = (event) => {
    if(checkAddress)
        setCheckAddress(false)
    setToAddress(event.target.value);
  };

  const handleEncodedData = (event) => {
    if(checkData)
        setCheckData(false);
    setEncodedData(event.target.value);
  };

  return (
    <>
      {/* <div onClick={handleSent}>sent</div> */}
      <form onSubmit={props.isConnect ? handleSent : handleNone}>
        <div className="execute-main-container">
          <p>To Address*</p>
          <input
            className="input-box-to-address"
            type="text"
            value={toAddress}
            placeholder="Address"
            onChange={handleToAddress}
          />
          <p className="check-warning">{checkAddress}</p>
          <p>Encoded data*</p>
          <textarea
            className="text-area-box-for-data"
            value={encodedData}
            placeholder="Encoded data"
            onChange={handleEncodedData}
          />
          <p className="check-warning">{checkData}</p>
          <button  className={props.isConnect ? "button-for-execute" : "button-for-execute-disable"} type="submit">
            Execute
          </button>
        </div>
      </form>
    </>
  );
}
