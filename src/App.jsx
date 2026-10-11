import { useState } from 'react'
import './App.css'

function App() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')
  const [expenses, setExpenses] = useState([])

  function handleAdd() {
    if (description === '' || amount === '' || date === '') {
      alert('Please fill in all fields')
      return
    }

    const newExpense = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      category: category,
      date: date,
    }

    setExpenses([...expenses, newExpense])

    setDescription('')
    setAmount('')
    setDate('')
  }

  let total = 0
  for (const expense of expenses) {
    total = total + expense.amount
  }

  return (
    <div className="container">
      <h1>Daily Expense Tracker</h1>

      <h2>Add Expense</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (Rs.)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Education</option>
          <option>Health</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add Expense</button>
      </div>

      <h2>My Expenses</h2>

      {expenses.length === 0 && <p>No expenses yet.</p>}

      {expenses.map((expense) => (
        <div className="expense" key={expense.id}>
          <span>
            {expense.description} ({expense.category}) - {expense.date}
          </span>
          <span>Rs. {expense.amount}</span>
        </div>
      ))}

      <h2 className="total">Total: Rs. {total}</h2>
    </div>
  )
}

export default App