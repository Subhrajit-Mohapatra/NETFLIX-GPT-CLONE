const formValidate= (email,password,name)=>{
 const isEmailValid=/^\S+@\S+\.\S+$/.test(email);
 const isPasswordValid=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(password);
 if (name && name.trim() !== "") {
    const isNameValid = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})+$/.test(name);
    if (!isNameValid) return 'Name is Invalid';
  }
 if(!isEmailValid) return 'Email is not valid';
 if(!isPasswordValid) return 'Password is Invalid';
 return null;
}
export default formValidate;