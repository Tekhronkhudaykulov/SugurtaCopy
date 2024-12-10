import axios from 'axios';
import React, { useState } from 'react';

const PrintReceipt = () => {
    const [checkData, setCheckData] = useState({
        transaction_no: '1',
        card: 'Naqd',
        payer: 'Xudaykulov Texron',
        commission: '0',
        payment_time: '2024-12-09 12:00',
        amount: '5000 sum',
        status: 'Muvaffaqiyatli',
        qr_url: 'https://myinsurance.uz/',
    });

    const handlePrint = async () => {
        try {
            const response = await axios.post('http://192.168.100.60:5001/print-check', checkData);
            alert(response.data.message);
        } catch (error) {
           console.log("Error printing check: " + error.response?.data?.message || error.message);
           
        }
    };


    return (
        <div>
            <button onClick={handlePrint}>Print Receipt</button>
        </div>
    );
};

export default PrintReceipt;