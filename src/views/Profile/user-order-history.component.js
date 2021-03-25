// Testing
import React, { Component } from 'react';
import {AppProvider, Page} from '@shopify/polaris';
import axios from 'axios'; //  Using this to make an axios call to the DB
import DataTable from './DataTable.js';
import './DatatabeAndCell.css';



class UserOrderHistory extends React.Component {

    render() {
        // if (JSON.parse(window.sessionStorage.getItem("isLogged") === "false")){
        //     window.location.href = "/user"
        // }
        // var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
        // return (
        //   <div className='homepage'>
        //     <h1>Order History for {userObject['firstName']}!</h1>
        //   </div>
        // );

        const headings = [
          'Restaurant',
          'Type of Order',
          'Quantity',
          'Time of Order',
          'Total Amount',
          'Order Status',
          'Payment Type',
          'Review/Ratings',
          'View Full Order Details',
        ];
    
        const rows = [
          [
            'Papa Jones',
            "Pizza",
            3,
            '$35.00',
            '11:30pm',
            "Completed",
            'Credit Card',
            'Covid Safe',
            'Button',
          ],
          [
            'McDonalds',
            "Burger",
            5,
            '$55.00',
            '1:30pm',
            "Completed",
            'Credit Card',
            'Covid Safe',
            'Button',
          ],
          [
            'KCF',
            "Chicken",
            10,
            '$255.00',
            '4:30pm',
            "Completed",
            'Credit Card',
            'Covid Safe',
            'Button',
          ],
          [
            'Pari',
            "Salad",
            1,
            '$5.00',
            '9:30pm',
            "Completed",
            'Credit Card',
            'Covid Safe',
            'Button',
          ],
        ];
        var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
        return (
          <AppProvider>
             
       
            <div className='homepage'>
              <h1>Order History for {userObject['firstName']}!</h1>
            </div>
            <DataTable headings={headings} rows={rows} />
           
          </AppProvider>
        );


      }
}

export default UserOrderHistory;
