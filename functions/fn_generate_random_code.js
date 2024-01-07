exports = async function(arg){
 console.log("fn_generate_random_code")
 return Math.floor(100000 + Math.random() * 900000).toString();
};