
const CompletePattern = (N) => 
{
    debugger
   let count=1
  for(let i=1;i<=N;i++){
    let res=""
     for(let j=1;j<=i;j++){
       if(count%2===0){
         res+="0"+" "
         
       }
       else{
         res+="1"+" "
       }
       count++
     }
     
    
  console.log(res)
  }
    
    
};
 CompletePattern(5)