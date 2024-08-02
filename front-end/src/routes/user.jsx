import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Account, Footer } from '../components';
import { editEmail, editFirstName, editLastName, editUserName } from '../redux/editProfile';
import { useEffect, useState } from 'react';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isActive, setActive] = useState(false);

  const authToken = useSelector((state) => state.token.token);

  useEffect(() => {
    if (authToken === '') {
      alert("Not authentificated")
      navigate("/");
    } else {
      userProfile();
    }
  })

  async function userProfile() {
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
      console.log(result)
      SetStore(result.body);
    } catch (error) {
      console.error(error.message);
    }
  }

  function SetStore(data) {
    dispatch(editEmail(data.email));
    dispatch(editFirstName(data.firstName));
    dispatch(editLastName(data.lastName));
    dispatch(editUserName(data.userName));
  }

  const userInfo = useSelector((state) => state.profile);

  function openEditMode() {
    setActive(true);
  }

  function closeEditMode() {
    console.log("CLOSE EDIT MODE")
    setActive(false);
  }

  async function saveUserName() {
    const username = document.getElementById('username').value;
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        body: JSON.stringify({
          "userName": username,
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
      const result = await response.json()
      console.log(result);
      dispatch(editUserName(username));
      closeEditMode();
    } catch (error) {
      console.error(error.message);
    }
  }

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
              <Button content="Save" onClick={saveUserName} />
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