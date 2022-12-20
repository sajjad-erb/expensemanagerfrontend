import { useGetTransactionsQuery } from '../../services/api/transactionApi'
import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(...registerables);
Chart.register(CategoryScale);

const Dashboard = () => {

    const { data: transactions } = useGetTransactionsQuery({ refetchOnMountOrArgChange: true })
    // const transaction = transactions?.map(transaction => {
		// 		console.log(transaction.category)
		// 		console.log(transaction.amount)
		// })
    
    return (
        <div className='h-75 mt-5'>
          <h3 className='mb-5 text-center text-4xl'>Expenses Pie Chart</h3>
            <Pie data={{
                   labels: transactions?.map((data) => data.category),
                   datasets: [
                     {
                       label: "Expense",
                       data: transactions?.map((data) => data.amount),
                       backgroundColor: [
                         "rgba(75,192,192,1)",
                         "#ecf0f1",
                         "#50AF95",
                         "#f3ba2f",
                         "#2a71d0",
                       ],
                     },
                   ]
            }} width={'900px'} options={{
                responsive: true,
                maintainAspectRatio: false
            }}/>
        </div>
    )
}

export default Dashboard