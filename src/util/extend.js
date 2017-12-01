export function extend(obj1, obj2){
  var obj = {}
  for(var key in obj1){
    obj[key] = obj1[key]
  }
  for(var key in obj2){
    if(obj2.hasOwnProperty(key)===true&&obj2[key]){
      obj[key]=obj2[key];
    }
  }
  console.log(obj1);
  return obj;
}
