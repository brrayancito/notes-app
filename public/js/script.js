import { showAlert } from './alerts.js'

const formAddNote = document.getElementById('form-add-note')

// Handle create Note
if (formAddNote) {
  formAddNote.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value
    const body = document.getElementById('body').value

    try {
      const response = await fetch('https://node-app-w1dw.onrender.com/dashboard/add-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body
        })
      })

      showAlert('success', 'Note created successfully!')
      window.setTimeout(() => {
        window.location.assign('/dashboard')
      }, 1000)
    } catch (error) {
      console.log(error)
      showAlert('Something went wrong', 'error')
    }
  })
}
