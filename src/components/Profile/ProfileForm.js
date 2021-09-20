import { useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const passwordRes = useRef("")
  const context = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const password = passwordRes.current.value;

    fetch('http://localhost:8080/api/change-password', {
      method: 'POST',
      body : JSON.stringify({
        newPassword : password,
        oldPassword : '123'
      }),
      headers : {
        'Content-type' : 'application/json',
        'Authorization' : `Bearer ${context.token}`
      }
    }).then( res => {
      history.replace("/")
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRes}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
