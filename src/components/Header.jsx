import { useState } from 'react';
import concatenateNames from '../utilities/concatenateNames';
import '../styles/header.css';

export default function Header({ isEditing }) {
  const [headerData, setHeaderData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const prop = input.name;
    setHeaderData({
      ...headerData,
      [prop]: value,
    });
  };

  const resetHandler = () => {
    setHeaderData({
      firstName: '',
      lastName: '',
      jobTitle: '',
    });
  };

  const fullName = concatenateNames(headerData.firstName, headerData.lastName);

  return (
    <header>
      {isEditing ? (
        <form>
          <ul>
            <li className="form-item">
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                value={headerData.firstName}
                type="text"
                name="firstName"
                onChange={onChangeHandler}
              ></input>
            </li>

            <li className="form-item">
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                value={headerData.lastName}
                type="text"
                name="lastName"
                onChange={onChangeHandler}
              ></input>
            </li>

            <li className="form-item">
              <label htmlFor="jobTitle">Job title:</label>
              <input
                id="jobTitle"
                value={headerData.jobTitle}
                type="text"
                name="jobTitle"
                onChange={onChangeHandler}
              ></input>
            </li>
            <button type="button" onClick={resetHandler}>
              Reset
            </button>
          </ul>
        </form>
      ) : (
        <div>
          <h1>{fullName}</h1>
          <h2>{headerData.jobTitle}</h2>
        </div>
      )}
    </header>
  );
}
