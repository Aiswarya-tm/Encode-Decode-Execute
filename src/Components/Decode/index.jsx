import React from "react";

export default function Execute({web3,isConnect}) {

    const [dataTypes,setdDtaTypes] = React.useState()
    const [encodedData, setEncodedData] = React.useState()
    const [checkdataTypes,setCheckDataTypes] = React.useState(false);
    const [checkData,setCheckData] = React.useState(false);
    const [result,setResult] = React.useState();

    const handleDecode = async(event)=>{
        let dataArray = null;
        event.preventDefault();
        if(dataTypes!=null&&dataTypes!=undefined){
            if(dataTypes.trim()!=""){
                dataArray = dataTypes.split(",");
                if(encodedData!=null&&encodedData!=undefined){
                    if(encodedData.trim()!=""){
                        console.log("in sent ",dataArray,"   ",encodedData.toString())
                        console.log("in sent after ",web3.eth.abi.decodeParameters(dataArray,encodedData.toString()))
                        setResult(web3.eth.abi.decodeParameters(dataArray,encodedData.toString()));
                    }else{
                        setCheckData("Please enter encoded data") 
                    }
                }else{
                    setCheckData("Please enter encoded data") 
                }
            }else{
                setCheckDataTypes("Please enter valid data types")
            }
        }else{
            setCheckDataTypes("Please enter valid data types")
        }
    }

    const handleNone = (event)=>{
        event.preventDefault();
    }

    const handleDataTypes = (event) => {
        if(checkdataTypes)
            setCheckDataTypes(false)
        setdDtaTypes(event.target.value);
      };
    
      const handleEncodedData = (event) => {
        if(checkData)
            setCheckData(false);
        setEncodedData(event.target.value);
      };

    return(
        <>
        <form onSubmit={isConnect ? handleDecode : handleNone}>
        <div className="execute-main-container">
          <p>Data Types*</p>
          <input
            className="input-box-to-address"
            type="text"
            value={dataTypes}
            placeholder="eg: uint256,address,address[] etc"
            onChange={handleDataTypes}
          />
          <p className="check-warning">{checkdataTypes}</p>
          <p>Encoded data*</p>
          <textarea
            className="text-area-box-for-data"
            value={encodedData}
            placeholder="Encoded data"
            onChange={handleEncodedData}
          />
          <p className="check-warning">{checkData}</p>
          <button  className={isConnect ? "button-for-execute" : "button-for-execute-disable"} type="submit">
            Decode
          </button>
          <p className="result">{JSON.stringify(result)}</p>
        </div>
      </form>
        </>
    )
}