import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Account, Footer } from '../components';
import { setEmail, setFirstName, setLastName, setUserName } from '../redux/profileSlice';
import { useEffect, useState } from 'react';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);

  // Get auth token from state if not found return to home page
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken === '') {
      alert("Not authentificated");
      navigate("/");
    } else {
      getUserProfile();
    }
  })

  // Get user profile from API
  async function getUserProfile() {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Missing profile");
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setUserProfile(result.body);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Set all informations to the store
  function setUserProfile(data) {
    dispatch(setEmail(data.email));
    dispatch(setFirstName(data.firstName));
    dispatch(setLastName(data.lastName));
    dispatch(setUserName(data.userName));
  }

  // Display edit username form
  function openEditMode() {
    setActive(true);
  }

  // Hide edit username form
  function closeEditMode() {
    console.log("CLOSE EDIT MODE")
    setActive(false);
  }

  // PUT request to set new username and save it to the store
  async function editUserName() {
    const userName = document.getElementById('username').value;
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        body: JSON.stringify({
          "userName": userName,
        }),
        headers: {
          "Authorization": "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Error when saving username");
        throw new Error(`Response status: ${response.status}`);
      }
      dispatch(setUserName(userName));
      closeEditMode();
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get user informations from the store
  const userInfo = useSelector((state) => state.profile);

  return (
    <>
      <Header logged={true} firstName={userInfo.userName} />
      <main className="main bg-dark">
        {isActive ? (
          <div className='edit'>
            <h1>Edit user info</h1>
            <Input wrapperClass="edit-input" title="User name:" id="username" type="text" placeholder={userInfo.userName} />
            <Input wrapperClass="edit-input" title="First name:" id="firstname" type="text" isDisabled={true} placeholder={userInfo.firstName} />
            <Input wrapperClass="edit-input" title="Last name:" id="lastname" type="text" isDisabled={true} placeholder={userInfo.lastName} />
            <div className='button-container'>
              <Button content="Save" onClick={editUserName} />
              <Button content="Cancel" onClick={closeEditMode} />
            </div>
          </div>
        ) : (
          <div className="header">
            <h1 id="title">Welcome back<br />{userInfo.firstName + " " + userInfo.lastName + "!"}</h1>
            <button className="edit-button" onClick={openEditMode}>Edit Name</button>
          </div>
        )}
        <h2 className="sr-only">Accounts</h2>
        <Account 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account 
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </>
  )
} 