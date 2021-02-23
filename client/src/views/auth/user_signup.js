import React from 'react';
import logo from '../../assets/logo.svg';
// import './Home.css';  

function Signup() {
    return (
        <div className="user_signup">
            <header className="user_signup_header">
               
                <p>
                    Please Fill in the form to register (This is just a test)
                </p>
                <form>
                    <label>
                        First Name:
                        <input type="text" name="f_name" />
                        Last Name:
                        <input type="text" name="l_name" />
                        Password:
                        <input type="password" name="password" />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </header>
        </div>
    );
}

export default Signup;
