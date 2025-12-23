import React, { useState, useEffect } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const [value] = useTypewriter({
    words: ['Details', 'Information', 'List'],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 120,
  });

  useEffect(() => {
    EmployeeService.getAllEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
      .then(() => EmployeeService.getAllEmployees())
      .then((res) => setEmployees(res.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="mt-5">
      <h3 className="mt-5 text-center pt-3">
        Employee {value}
        <Cursor cursorStyle="|" />
      </h3>

      <div className="container mt-5">
        <Link to="/add-emp" className="btn btn-secondary w-25 mb-2">
          Add Employee
        </Link>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>DOJ</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.doj}</td>
                  <td>{emp.dept?.deptName}</td>
                  <td>{emp.dept?.designation}</td>
                  <td>
                    <Link
                      to={`/update-emp/${emp.id}`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>

                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
