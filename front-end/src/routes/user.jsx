import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header, Account, Footer } from '../components';
import { editEmail, editFirstName, editLastName, editUserName } from '../redux/editProfile';
import { useEffect } from 'react';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const userInfo = useSelector((state) => state.profile)

  return (
    <>
      <Header logged={true} firstName={userInfo.firstName} />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userInfo.firstName + " " + userInfo.lastName + "!"}</h1>
          <button className="edit-button">Edit Name</button>
        </div>
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