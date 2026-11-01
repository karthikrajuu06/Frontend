function Demo(){
    let name = "rajuu";
      function changeName(){
        name = "john";
      }
    return(
        <div>
            <h1> {name}</h1>
            <button onClick = {changeName}> Change</button>
        </div>
    )
}

export default Demo;