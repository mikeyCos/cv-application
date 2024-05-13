import { useState } from 'react';
import { header as initialHeaderState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import concatenateNames from '../utilities/concatenateNames';
import '../styles/header.css';

export default function Header({ isEditing, validateForm }) {
  const [headerData, setHeaderData] = useState({
    ...initialHeaderState,
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
      ...initialHeaderState,
    });
  };

  const fullName = concatenateNames(headerData.firstName, headerData.lastName);

  return (
    <header>
      {isEditing ? (
        <form onSubmit={validateForm}>
          <ul>
            <FormItem
              id="header_firstName"
              value={headerData.firstName}
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              placeholder="First name"
            />

            <FormItem
              id="header_lastName"
              value={headerData.lastName}
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              placeholder="Last name"
            />

            <FormItem
              id="header_jobTitle"
              value={headerData.jobTitle}
              type="text"
              name="jobTitle"
              onChange={onChangeHandler}
              placeholder="Job title"
            />
            <Button text="Reset" onClick={resetHandler}></Button>
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
