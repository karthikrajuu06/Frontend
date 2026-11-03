import React, { useState } from "react";
function Demo(){
   // let name = "rajuu";

   let [name, setName] = useState("rajuu");

      function changeName(){
      //  name = "john";

      setName("karthik");
      }
    return(
        <div>
            <h1> {name}</h1>
            <button onClick = {changeName}> Change</button>
        </div>
    )
    // i wanted to complete the harder ones first and move on to the easier ones this would helps me to get the good score 
}

export default Demo;