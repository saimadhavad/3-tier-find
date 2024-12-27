import  React,{ useEffect, useRef, useState } from 'react'

function EmployeesForm() {

    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();

    let [employees, setEmployees] = useState([]);
    let [countriesList, setCountriesList] = useState([]);
    let [departmentsList, setDepartmentsList] = useState([]);
    let [gendersList, setGendersList] = useState([]);


    // API END POINTS
    let getEmployeesDataFromServer = async () =>
    {
        let reqOptions = {
            method:"GET"
        }    

        let urlQueryString = `http://localhost:1629/employees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;
        console.log(urlQueryString);

        let urlParams = `http://localhost:1629/employees/${countrySelectRef.current.value}/${departmentSelectRef.current.value}/${genderSelectRef.current.value}?limit=5&order=desc`;
        console.log(urlParams);

        console.log(urlQueryString);
        console.log(urlParams);

        let JSONData = await fetch(urlQueryString,reqOptions);
        let JSOData = await JSONData.json();
        setEmployees(JSOData);
        console.log(JSOData);
    }   
    let getCountriesListDataFromServer = async () =>
    {
        let reqOptions = {
            methos:"GET"
        }
        let JSONData = await fetch("http://localhost:1629/countriesList",reqOptions);
        let JSOData = await JSONData.json();
        setCountriesList(JSOData);
        console.log(JSOData);
    }
    let getDepartmentsListDataFromServer = async () => 
    {
        let reqOptions = {
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:1629/departmentsList",reqOptions);
        let JSOData = await JSONData.json();
        setDepartmentsList(JSOData);
        console.log(JSOData);
    }
    let getGendersListDataFromServer =  async () =>
    {
        let reqOptions = {
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:1629/gendersList",reqOptions);
        let JSOData = await JSONData.json()
        setGendersList(JSOData);
        console.log(JSOData);
    }

    useEffect( ()=> {
        getCountriesListDataFromServer();
        getDepartmentsListDataFromServer();
        getGendersListDataFromServer();
    },[])

  return (
    <div>
        <h1>3-TIER mongoDB-find</h1>
        <form>
            <h2>EMPLOYEES DETAILS</h2>
            <div className='formDiv'>
                <div>
                    <label>Country</label>
                    <select ref={countrySelectRef}>{countriesList.map((element,index)=>{
                        return <option key={index}>{element}</option>
                    })}</select>
                </div>
                <div>
                    <label>Department</label>
                    <select ref={departmentSelectRef}>{departmentsList.map((element,index) => {
                        return<option key={index}>{element}</option>
                    })}</select>
                </div>
                <div>
                    <label>Gender</label>
                    <select ref={genderSelectRef}>{gendersList.map((element,index) => {
                        return<option key={index}>{element}</option>
                    })}</select>
                </div>
            </div>
            
            <button type='button'
                onClick={ () =>{
                    getEmployeesDataFromServer();
                }}
            >Get Employees Data</button>
        
        </form>
        {/* <hr></hr> */}
        <div className='tableDiv'>
        <table>
            <thead>
                <tr>
                    <th>S.NO</th>
                    <th>ID</th>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((element,index)=> {
                    return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.id}</td>
                    <td><img src={element.profilePic} alt={element.firstname}></img></td>
                    <td>{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.age}</td>
                    <td>{element.gender}</td>
                    <td>{element.email}</td>
                    <td>{element.department}</td>
                    <td>{element.country}</td>
                </tr>
                })}                
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default EmployeesForm
