

export const hourAndDate =(timestamp)=>{
    const date = new Date(timestamp); 
 const myDate =
   date.getDate() +
   "/" +
   (date.getMonth() + 1) +
   "/" +
   date.getFullYear() +
   " " +
   date.getHours() +
   ":" +
   date.getMinutes() +
   ":" +
   date.getSeconds();
   return myDate
}