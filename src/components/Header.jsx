import { useState } from 'react';
import { header as initialHeaderState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import concatenateNames from '../utilities/concatenateNames';
import '../styles/header.css';

export default function Header({ isEditing }) {
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
        <form>
          <ul>
            <FormItem
              id="firstName"
              value={headerData.firstName}
              type="text"
              name="firstName"
              onChange={onChangeHandler}
            />

            <FormItem
              id="lastName"
              value={headerData.lastName}
              type="text"
              name="lastName"
              onChange={onChangeHandler}
            />

            <FormItem
              id="jobTitle"
              value={headerData.jobTitle}
              type="text"
              name="jobTitle"
              onChange={onChangeHandler}
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
