import React from "react";
import { Button } from "./ui/button";
import { generateRequestParameters } from "@/utils/generateRequestParamaters";
import { generateRequestParamatersParams } from "@/types/types";
import { TOKEN_ADDRESS_SEPOLIA } from "@/utils/constants";

const CreateRequestButton = ({
  payeeIdentity,
  payerIdentity,
  expectedAmount,
  dueDate,
  reason,
}: generateRequestParamatersParams) => {


    const handleClick = () => {
        
         if(payeeIdentity === "" || payerIdentity === "" || expectedAmount === "" || dueDate === "" || reason === "") {

            return alert("Please fill in all the fields")
         }

        const requestParameters = generateRequestParameters({
        payeeIdentity,
        payerIdentity,
        expectedAmount,
        dueDate,
        reason,
        tokenAddress: TOKEN_ADDRESS_SEPOLIA
        });
        
        console.log("Request Parameters:", requestParameters);
         

    }
         
  return (
    <Button onClick={() => handleClick} className="w-full mt-4">
      Create
    </Button>
  );
};

export default CreateRequestButton;
