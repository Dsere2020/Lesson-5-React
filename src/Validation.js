import React, { useEffect, useState } from 'react'

const Validation = ({setUsers}) => {
    const [formValues, setFormValues ] = useState({
        name:"",
        surName:"",
        age:"",
        email:"",
        gender:"Male",
    });

const [formErrors, setFormErrors] = useState({});
const [isFormValid, setIsFormValid] = useState(false);

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues,[name]: value});
    setIsFormValid(true);

}


const hanldeSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [
        ...prevUsers,
        {...formValues,id: new Date().getDate()},

    ]);
    // setFormValues({
    //     name:"",
    //     surName:"",
    //     age:"",
    //     email:"",
    //     gender:"Male"
    // })

}
useEffect(() => {
    const timer = setTimeout(() => {
        const validationResult = validate(formValues);
        setFormErrors(validationResult);
        if(
            formValues.name && !validationResult.name
            && formValues.surName && !validationResult.surName
            && formValues.age && !validationResult.age
            && formValues.email && !validationResult.email
            && formValues.gender && !validationResult.gender
        ){
        }
    },1000);
    return () => {
        clearTimeout(timer)
    }
},[formValues]);

const validate = (values) => {
    let errors ={};

    if(!values.name){
        errors.name="Name is required";
    }
    else if(values.name && values.name.length < 4){
        errors.name = "Please enter more than 4 character"
    }
    if(!values.surName){
        errors.surName="Name is required";
    }
    else if(values.surName && values.surName.length < 4){
        errors.surName = "Please enter more than 4 character"
    }
    if(!values.email){
        errors.email="Email is required";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid"
    }

    if(!values.age){
        errors.age="Age is required"
    }else if(values.age < 18){
        errors.age="You are baby"
    }
    
    return errors;
}

  return (
    <div className='app-container'>
    <form onSubmit={hanldeSubmit}>
        <div className='name'>
            <label>Name</label>
            <input type='text' name='name' required value={formValues.name} onChange={handleChange}/>
        </div>
        {formErrors.name && <p style={{color:'red'}}>{formErrors.name}</p>}
        <div className='surname'>
            <label>Surname</label>
            <input type='text' name='surName' required value={formValues.surName} onChange={handleChange}/>
        </div>
        {formErrors.surName && <p style={{color:'red'}}>{formErrors.surName}</p>}
        <div className='age'>
            <label>Age</label>
            <input type='number' name='age' value={formValues.age} onChange={handleChange}/>
        </div>
        {formErrors.age && <p style={{color:'red'}}>{formErrors.age}</p>}
        <div className='email'>
            <label>Email</label>
            <input type='email' name='email' required value={formValues.email} onChange={handleChange}/>
        </div>
        {formErrors.email && <p style={{color:'red'}}>{formErrors.email}</p>}
        <label>Gender</label>
        <select onChange ={handleChange}  name="gender" value={formValues.gender}>
            <option>Male</option>
            <option>Female</option>
            <option>Bi-Polar Unicorn</option>
        </select>
        {formErrors.gender && <p>{formErrors.gender}</p>}
        <br>
        </br>
        <button type='submit' disabled={!isFormValid}>Add</button>
        {/* <p> Name {formValues.name}</p>
        <p> Surname {formValues.surName}</p>
        <p> Age {formValues.age}</p>
        <p> Email {formValues.email}</p>
        <p> Gender {formValues.gender}</p>
         */}
    </form>
    </div>
  )
}

export default Validation;