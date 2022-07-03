import React from "react";

export default function Encode({web3,isConnect}) {

  const [checkAddress,setCheckAddress] = React.useState(false);
  const [checkData,setCheckData] = React.useState(false);

  const [fnName,setFnName] = React.useState();
  const [inputTypes,setInputTypes] = React.useState();
  const [values,setValues] = React.useState();

  const [checkFnName,setCheckFnName] = React.useState(false);
  const [checkInputTypes,setCheckInputTypes] = React.useState(false);
  const [checkValues,setCheckValues] = React.useState(false);

  const [result,setResult] = React.useState();

  const check = ()=>{
    console.log("in sent before checkFnName ",fnName!=null,fnName!=undefined);
    if(fnName!=null&&fnName!=undefined){
        if(fnName.trim()!=""){
            setCheckFnName(false)
        }else{
            setCheckFnName("Please enter function name")
        }
    }else{
        console.log("in sent before checkFnName else")
        setCheckFnName("Please enter function name")
    }
    console.log("in sent before checkInputTypes")
    if(inputTypes!=null&&inputTypes!=undefined){
        if(inputTypes.trim()!=""){
            setCheckInputTypes(false)
        }else{
            setCheckInputTypes("Please enter input types")
        }
    }else{
        setCheckInputTypes("Please enter input types")
    }
    console.log("in sent before checkValues")
    if(values!=null&&values!=undefined){
        if(values.trim()!=""){
            setCheckValues(false)
        }else{
            setCheckValues("Please enter input values")
        }
    }else{
        setCheckValues("Please enter input values")
    }
  }

  const handleEncode = (event) => {
    event.preventDefault();
    console.log("in sent before check")
    check()
    console.log("in sent after check")
    if(!checkFnName&&!checkValues&&!checkInputTypes){

        let dummyParamName = "dummy";
        let obj ={}
        
        let inputList = inputTypes.split(",")
        console.log("in sent here after list 1 ",inputList)
        let valuesList =  values.split(",")
        console.log("in sent here before list 2 ",valuesList)
        let input = []
        for(let i = 0;i<inputList.length;i++) {
            obj["type"] = inputList[i]
            obj["name"] = dummyParamName
            input.push(obj)
        }
        console.log("in sent object array ",input)
        // let result = web3.eth.abi.encodeFunctionCall({
        //     name: fnName,
        //     type: 'function',
        //     inputs: input
        // }, valuesList);

        console.log("in sent res ",result)
        setResult(web3.eth.abi.encodeFunctionCall({
            name: fnName,
            type: 'function',
            inputs: input
        }, valuesList))
    }else{
        console.log("in sent no value")
    }
    
    
    
  };

  const handleNone = (event)=>{
    event.preventDefault();
  }

  const handleFnName = (event) => {
    if(checkAddress)
        setCheckFnName(false)
    setFnName(event.target.value);
  };

  const handleInputTypes = (event) => {
    if(checkData)
        setCheckInputTypes(false);
    setInputTypes(event.target.value);
  };

  const handleValues = (event) => {
    if(checkData)
        setCheckValues(false);
    setValues(event.target.value);
  };

  return (
    <>
      {/* <div onClick={handleSent}>sent</div> */}
      <form onSubmit={isConnect ? handleEncode : handleNone}>
        <div className="execute-main-container">
          <p>Function Name*</p>
          <input
            className="input-box-to-address"
            type="text"
            value={fnName}
            placeholder="Function name"
            onChange={handleFnName}
          />
          <p className="check-warning">{checkFnName}</p>
          <p>Input types*</p>
          <input
            className="input-box-to-address"
            type="text"
            value={inputTypes}
            placeholder="eg: uint256,string"
            onChange={handleInputTypes}
          />
          <p className="check-warning">{checkInputTypes}</p>
          <p>Input values of params*</p>
          <input
            className="input-box-to-address"
            type="text"
            value={values}
            placeholder="eg: 7,hello"
            onChange={handleValues}
          />
          <p className="check-warning">{checkValues}</p>
          <button  className={isConnect ? "button-for-execute" : "button-for-execute-disable"} type="submit">
            Encode Function
          </button>
          <p className="result">{result}</p>
        </div>
      </form>
    </>
  );
}
