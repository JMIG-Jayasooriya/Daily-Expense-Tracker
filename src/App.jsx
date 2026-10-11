import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')
  const [expenses, setExpenses] = useState(() => {
  const saved = localStorage.getItem('expenses')
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses))
}, [expenses])
  const [editingId, setEditingId] = useState(null)

  function clearForm() {
    setDescription('')
    setAmount('')
    setCategory('Food')
    setDate('')
    setEditingId(null)
  }

  function handleSave() {
    const enteredYear = Number(date.slice(0, 4))
if (enteredYear < 2000 || enteredYear > 2100) {
  alert('Please enter a valid date')
  return
}

    if (editingId === null) {
      const newExpense = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        category: category,
        date: date,
      }
      setExpenses([...expenses, newExpense])
    } else {
      const updatedList = expenses.map((expense) => {
        if (expense.id === editingId) {
          return {
            id: expense.id,
            description: description,
            amount: Number(amount),
            category: category,
            date: date,
          }
        }
        return expense
      })
      setExpenses(updatedList)
    }

    clearForm()
  }

  function handleEdit(expense) {
    setDescription(expense.description)
    setAmount(expense.amount)
    setCategory(expense.category)
    setDate(expense.date)
    setEditingId(expense.id)
  }

  function handleDelete(id) {
    const remaining = expenses.filter((expense) => expense.id !== id)
    setExpenses(remaining)
  }

  let total = 0
  for (const expense of expenses) {
    total = total + expense.amount
  }
  const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')
const today = `${year}-${month}-${day}`
const thisMonth = `${year}-${month}`

let todayTotal = 0
let monthTotal = 0
for (const expense of expenses) {
  if (expense.date === today) {
    todayTotal = todayTotal + expense.amount
  }
  if (expense.date.startsWith(thisMonth)) {
    monthTotal = monthTotal + expense.amount
  }
}

  return (
    <div className="container">
      <h1>Daily Expense Tracker</h1>
      <div className="summary">
  <div>
    <p>Today</p>
    <strong>Rs. {todayTotal}</strong>
  </div>
  <div>
    <p>This month</p>
    <strong>Rs. {monthTotal}</strong>
  </div>
</div>

      <h2>{editingId === null ? 'Add Expense' : 'Edit Expense'}</h2>
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
        <button onClick={handleSave}>
          {editingId === null ? 'Add Expense' : 'Save Changes'}
        </button>
        {editingId !== null && (
          <button className="cancel" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>

      <h2>My Expenses</h2>

      {expenses.length === 0 && <p>No expenses yet.</p>}

      {expenses.map((expense) => (
        <div className="expense" key={expense.id}>
          <span>
            {expense.description} ({expense.category}) - {expense.date}
          </span>
          <span>Rs. {expense.amount}</span>
          <div className="actions">
            <button className="edit-btn" onClick={() => handleEdit(expense)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <h2 className="total">Total: Rs. {total}</h2>
    </div>
  )
}

export default App